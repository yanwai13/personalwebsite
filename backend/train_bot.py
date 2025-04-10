import json
import random
import numpy as np
import spacy
from sklearn.preprocessing import LabelEncoder
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.utils import to_categorical
import pickle

nlp = spacy.load("en_core_web_sm")

# Load intents JSON
with open("intents.json") as f:
    data = json.load(f)


X = []
y = []

for intent in data["intents"]:
    for pattern in intent["patterns"]:
        doc = nlp(pattern.lower())
        tokens = [token.lemma_ for token in doc if not token.is_stop and not token.is_punct]
        X.append(" ".join(tokens))       
        y.append(intent["tag"])
        
        
le = LabelEncoder()
y_encoded = le.fit_transform(y) # to convert tags to numbers before training.  # LabelEncoder().inverse_transform([2]) → to convert back to "greeting" after prediction.
y_cat = to_categorical(y_encoded) #One-Hot Encoding :  represent categorical labels as binary vectors

# Bag of words (basic)
from sklearn.feature_extraction.text import CountVectorizer
vectorizer = CountVectorizer()
X_vectorized = vectorizer.fit_transform(X).toarray()



# Build model
unqiue_word = X_vectorized.shape[1] # X_vectorized.shape = (3,4) like 3 row and 4 unqiue word, now we have 13 unqiue words
type_tag = len(y_cat[0]) # how many tags, which is 4

model = Sequential()
model.add(Dense(8, input_shape=(unqiue_word,), activation="relu"))
model.add(Dense(8, activation="relu"))
model.add(Dense(type_tag, activation="softmax"))

model.compile(loss="categorical_crossentropy", optimizer="adam", metrics=["accuracy"])
model.fit(X_vectorized, y_cat, epochs=200, verbose=1)

# Save model & encoders
model.save("chat_model.h5")
pickle.dump(le, open("label_encoder.pkl", "wb"))
pickle.dump(vectorizer, open("vectorizer.pkl", "wb"))

