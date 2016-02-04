# Swegg

--------------------

### Basic setup
```{bash}
cd swegg
virtualenv --python=python3 venv
source venv/bin/activate
pip install -r requirements.txt
```

### Local server for development

#### Option a) Flask server
```{bash}
source venv/bin/activate
python run.py
```

#### Option b) Appengine local server
```{bash}
gcloud preview app run app.y
```

or

```{bash}
dev_appserver .
```
Now point your browser to **http://localhost:8080**

### Deployment
Note that you must have created your project at [https://console.google.com](https://console.google.com).

```{bash}
gcloud config set project project-name
gcloud preview app deploy app.y
```
