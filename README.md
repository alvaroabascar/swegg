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
dev_appserver .
```

Now point your browser to **http://localhost:8080**
Your Swagger API documentation is available at **http://localhost:8080/api/v1/ui/**.

### Deployment
Note that you must have created your project at [https://console.google.com](https://console.google.com).

```{bash}
gcloud config set project project-name
gcloud preview app deploy app.y
```

### Modifying the API

You can edit the API editting the file [swagger.yaml](https://github.com/alvaroabascar/swegg/blob/master/app/swagger/swagger.yaml).
For this I recommend using the editor provided by [http://editor.swagger.io/#/](http://editor.swagger.io/#/).

The endpoints relate to functions inside the modules of **app/api/**. As for this template, only a module called [default_controller.py](https://github.com/alvaroabascar/swegg/blob/master/app/api/default_controller.py) is provided.
