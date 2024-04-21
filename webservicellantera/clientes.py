from mongo import mongo
from flask import Blueprint
from bson.json_util import dumps

client = Blueprint("cliente", __name__)

@client.route("/clientes/get_all")
def listar_clientes():
    data = mongo.db.clientes.find({})
    r = dumps(data)    
    return r