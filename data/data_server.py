from flask import Flask, request
import csv

app = Flask(__name__)

# Reading in food options from CSV file
data = {}
reader = csv.reader(open('food_data.csv'))
for row in reader:
    key = row[0]
    if key in data:
        pass
    data[key] = row[1:]

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

    return

if __name__ == '__main__':
    app.run()