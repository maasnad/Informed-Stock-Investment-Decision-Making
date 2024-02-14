import json
import boto3
import uuid
import csv


def map_word_id(response):
    word_map = {}
    for block in response["Blocks"]:
        if block["BlockType"] == "WORD":
            word_map[block["Id"]] = block["Text"]
        if block["BlockType"] == "SELECTION_ELEMENT":
            word_map[block["Id"]] = block["SelectionStatus"]
    return word_map


def extract_table_info(response, word_map):
    row = []
    table = {}
    ri = 0
    flag = False

    for block in response["Blocks"]:
        if block["BlockType"] == "TABLE":
            key = f"table_{uuid.uuid4().hex}"
            table_n = +1
            temp_table = []

        if block["BlockType"] == "CELL":
            if block["RowIndex"] != ri:
                flag = True
                row = []
                ri = block["RowIndex"]

            if "Relationships" in block:
                for relation in block["Relationships"]:
                    if relation["Type"] == "CHILD":
                        row.append(" ".join([word_map[i] for i in relation["Ids"]]))
            else:
                row.append(" ")

            if flag:
                temp_table.append(row)
                table[key] = temp_table
                flag = False
    return table

def dict_to_csv(data_dict, csv_filename):
    headers = data_dict[next(iter(data_dict))][0]

    table_data = data_dict[next(iter(data_dict))][1:]

    with open(csv_filename, 'w', newline='') as csvfile:
        csv_writer = csv.writer(csvfile)

        csv_writer.writerow(headers)

        csv_writer.writerows(table_data)

    print(f'CSV file "{csv_filename}" has been created.')

def lambda_handler():
    textract = boto3.client('textract',region_name='ap-south-1',aws_access_key_id="AKIAQ3EGSQGHKMOGJ34X",aws_secret_access_key="")
    with open('dada2.jpeg', 'rb') as image:
      img = bytearray(image.read())

    response = textract.analyze_document(Document={'Bytes':img},FeatureTypes=["TABLES"],)

    word_map = map_word_id(response)
    table = extract_table_info(response, word_map)
    print(table)

    dict_to_csv(table,'dada.csv')

    return {"statusCode": 200, "body": json.dumps("Ela Kiri")}


lambda_handler();