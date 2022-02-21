# coding=utf-8
from flask import Flask, render_template, request       # ermöglicht Abfrage in der URL, siehe Glossar.html

app = Flask(__name__)                                   # Die Variable app wird mit dem namen der URL deklariert

# reine Testseite
@app.route("/test")
def test():
    # args = Arguments
    name = request.args.get("name")
    # speichert, wenn in der URL ?name=xyz angegeben, xyz in die Variable name
    age = request.args.get("age")
    return render_template("test.html", name=name, age=age, title="Test vong Zeugs")
    # Speichert die Variable name in {name}, was wir in HTML benutzen - das rechts ist die variable,
    # die oben definiert wurde
    # können siehe test.html

@app.route("/")                                 # app ist die Variable, route die Methode/Funktion
def index():                                    # und der formale Parameter das Verzeichnis
    return render_template("index.html", title="Einführung in die Informationstechnik")

@app.route("/Ueberuns")                         # Das hier erzeugt die Route hinter dem Link. IP:Port/ueberuns
def ueberuns():                                 # in der layout Main, muss jetzt /ueberuns als Pfad angegeben werden
    return render_template("ueberuns.html", title="Über uns")     # Lädt ueberuns.html aus dem template Ordner

@app.route("/Das-Projekt")
def projekt():
    return render_template("projekt.html", title="Das Projekt")

@app.route("/Aus-Dem-Seminar")
def seminar():
    return render_template("seminar.html", title="Aus dem Seminar")

@app.route("/Datenschutz")
def datenschutz():
    return render_template("Datenschutz.html", title="Datenschutz")

@app.route("/Impressum")
def Impressum():
    return render_template("Impressum.html", title="Impressum")

@app.route("/sketch.js")
def sketch():
    return render_template("sketch.js")
