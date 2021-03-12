from flask import Flask, request, jsonify
from flask_cors import CORS
import csv


app = Flask(__name__)
CORS(app)

# Reading in food options from CSV file
data = {}
reader = csv.reader(open('food_data.csv'))
for row in reader:
    key = row[0]
    if key in data:
        pass
    data[key] = row[1:]

del data["name"]

@app.route('/')
def hello():
    return data


@app.route('/get_recommendation', methods=['POST'])
def get_recommendation():
    # Calculating current percentages to see where to place weight
    calories = request.args['calories']
    carbs = request.args['carbs'] * 4
    protein = request.args['protein'] * 4
    fat = request.args['fat'] * 9
    total = fat + protein + carbs
    fat_p = (.3 - (fat / total)) * 100
    protein_p = (.5 - (protein / total)) * 100
    carbs_p = (.2 - (carbs / total)) * 100

    # Getting user preferences
    pref = request.args['pref'].values()
    pref = list(pref.values())

    food_recs = {}
    for k,v in data.items():
        score = 0.0
        for i, value in enumerate(v[:-4]):
            if int(value) == int(pref[i]):
                score += 10.0
        if(float(v[8]) > calories):
            score -= 10.0
        else:
            score += float(v[8]) / 10.0
        score += float(v[9]) * fat_p
        score += float(v[10]) * protein_p
        score += float(v[11]) * carbs_p
        food_recs[k] = {'calories': float(v[8]), 'score': score}
    food_recs = dict(sorted(food_recs.items(), key=lambda item: -item[1]['score'])[0:10])

    return {'food_recs': food_recs}

@app.route('/test')
def test():
    calories = 1278.05
    carbs = 39
    protein = 60
    fat = 16

    total = fat + protein + carbs
    fat_p = (.3 - (fat / total)) * 100
    protein_p = (.5 - (protein / total)) * 100
    carbs_p = (.2 - (carbs / total)) * 100

    pref = {"baked goods or gluten": 1, "dairy and eggs": 1, "fast food": 1, "grains and pasta": 1, "meat": 1, "seafood": 1, "soup": 0, "vegetarian": 0}
    pref = list(pref.values())
    food_recs = {}
    for k,v in data.items():
        score = 0.0
        for i, value in enumerate(v[:-4]):
            if int(value) == int(pref[i]):
                score += 10.0
        if(float(v[8]) > calories):
            score -= 10.0
        else:
            score += float(v[8]) / 10.0
        score += float(v[9]) * fat_p
        score += float(v[10]) * protein_p
        score += float(v[11]) * carbs_p
        food_recs[k] = {'calories': float(v[8]), 'score': score}
    food_recs = dict(sorted(food_recs.items(), key=lambda item: -item[1]['score'])[0:10])

    return {'food_recs': food_recs}

if __name__ == '__main__':
    app.run(host='0.0.0.0')