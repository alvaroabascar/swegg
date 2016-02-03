import json

#########################################################
########                 ENDPOINTS              #########
#########################################################

def names_get():
    """Return a list of people names."""
    names = ["Pepe", "Josefina", "Laureano", "Priscila"]
    return json.dumps(names)
