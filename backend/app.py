from sklearn.metrics.pairwise import cosine_similarity
from flask import Flask, request, jsonify
import pandas as pd
import json

app = Flask(__name__)

tracks_df = pd.read_csv("./data/tracks.csv")
features_df = pd.read_csv("./data/features.csv", low_memory=False)


def drop_duplicates(df):
    df["artist_and_song"] = df.apply(
        lambda row: str(row["artist_name"]) + str(row["track_name"]), axis=1
    )
    return df.drop_duplicates("artist_and_song")


def drop_columns(df):
    return df[
        [
            "artist_name",
            "id",
            "track_name",
            "danceability",
            "energy",
            "key",
            "loudness",
            "mode",
            "speechiness",
            "acousticness",
            "instrumentalness",
            "liveness",
            "valence",
            "tempo",
            "artist_popularity",
            "genres",
            "track_popularity",
        ]
    ]


def preprocess_genres(df):
    df["genres_list"] = df["genres"].apply(lambda x: [s.replace(" ", "_") for s in x])
    return df


def preprocess_playlist(df):
    df = drop_duplicates(df)
    df = drop_columns(df)
    df = preprocess_genres(df)

    return df


def generate_playlist(features_df, user_playlist_df):
    features_in_playlist = features_df[
        features_df["id"].isin(user_playlist_df["id"].values)
    ]
    features_not_in_playlist = features_df[
        ~features_df["id"].isin(user_playlist_df["id"].values)
    ]
    features_in_playlist = features_in_playlist.drop(columns="id")

    return features_in_playlist.sum(axis=0), features_not_in_playlist


def get_recos(tracks_df, features_in_playlist, features_not_in_playlist):
    non_playlist_df = tracks_df[
        tracks_df["id"].isin(features_not_in_playlist["id"].values)
    ]

    non_playlist_df["sim"] = cosine_similarity(
        features_not_in_playlist.drop("id", axis=1).values,
        features_in_playlist.values.reshape(1, -1),
    )[:, 0]

    predict_playlist = non_playlist_df.sort_values("sim", ascending=False).head(50)

    return predict_playlist



def predict(request_body):
    user_playlist_df = pd.read_json(request_body)
    user_playlist_df = preprocess_playlist(user_playlist_df)

    features_in_playlist, features_not_in_playlist = generate_playlist(
        features_df, user_playlist_df
    )

    predict_playlist = get_recos(
        tracks_df, features_in_playlist, features_not_in_playlist
    )

    return predict_playlist


@app.route("/predict", methods=["POST"])
def predict_route():
    content_type = request.headers.get("Content-Type")
    if content_type == "application/json":
        body = request.json

        predict(json.dumps(body))

        return jsonify(body)
    else:
        return "Content-Type not supported!"


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080)
