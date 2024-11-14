import csv
import json
import os
import sys

def main(participant_id):
    # Load participant map data (this JSON file needs to be updated with actual participant data storage method)
    with open('participant_map_data.json', 'r') as file:
        data = json.load(file)

    # Define the CSV file path with the participant ID
    csv_filename = f"data/participant_map_{participant_id}.csv"

    # Create the data folder if it doesn't exist
    os.makedirs("data", exist_ok=True)

    # Write data to CSV
    with open(csv_filename, 'w', newline='') as csvfile:
        fieldnames = ['icon', 'x', 'y']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

        writer.writeheader()
        for icon_data in data.get("iconsData", []):
            writer.writerow(icon_data)

    print(f"CSV file saved as {csv_filename}")

if __name__ == "__main__":
    # Receive participant ID as an argument from GitHub Action
    if len(sys.argv) < 2:
        print("Participant ID required as the first argument.")
    else:
        main(sys.argv[1])
