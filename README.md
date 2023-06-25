# shopist
Simple shopping list for managing the items you bought.
Built for myself as a learning project (react, flask, data warehouses, generating excel documents) and as entry in job resume.
Project still in progress.

## How to start

1. Install required packages using `npm`:
```bash
$ npm install
```
2. Install `flask` using `pip`:
```bash
$ pip install Flask
```
3. Run the backend using the following command:
```bash
$ npm run flask
```
4. Run the frontent using the following command:
```bash
$ npm run parcel
```

### Generating mock data
The [mock data folder](https://github.com/Dawnkai/shopist/tree/main/mock_data) contains .csv files that can be used to add pre-made data into the database using a file called `script.py` in aforementioned folder. Just run it in that folder like this:
```bash
$ python script.py
```

### TODO:
* Generating template documents from data
* Testing
* Statistics and plots

Other, non-essential bugs and enchancements are listed in the issues, [here](https://github.com/Dawnkai/shopist/issues).
