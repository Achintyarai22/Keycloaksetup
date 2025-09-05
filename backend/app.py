from flask import Flask, render_template, request, redirect
from flask_sqlalchemy import SQLAlchemy 
from datetime import datetime
from flask_cors import CORS





app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+mysqlconnector://root:@localhost/Todo"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app, origins=["*"])


class Todo(db.Model):
    sno = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    desc = db.Column(db.String(500), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)

    # def __repr__(self) -> str:
    #     return f"{self.sno} - {self.title}"


@app.route("/")
def home():
    return "Hello, Flasks!"

@app.route('/add', methods=['POST'])
def add_todo():
     data = request.get_json()
     title = data.get("title")
     desc = data.get("desc")
     todo = Todo(title=title, desc=desc)
     db.session.add(todo)
     db.session.commit()
     return {"message": "Todo added successfully!"}, 201
 
 
@app.route('/getabyid/<id>', methods=['GET'])
def get_todo_by_id(id):
     todo = Todo.query.get(id)
     if todo:
         return {
             "sno": todo.sno,
             "title": todo.title,
             "desc": todo.desc,
             "date_created": todo.date_created
         }, 200
     else:
         return {"message": "Todo not found!"}, 404
     
@app.route('/getall', methods=['GET'])
def get_all_todos():
    todos = Todo.query.all()
    All_Todos = []
    for todo in todos:
        All_Todos.append({
            "sno": todo.sno,
            "title": todo.title,
            "desc": todo.desc,
            "date_created": todo.date_created
        })
        print(f"sno: {todo.sno}, title: {todo.title}, desc: {todo.desc}, date_created: {todo.date_created}")
    return {"todos": All_Todos}, 200   

@app.route('/delete/<id>', methods=['DELETE'])
def delete_todo(id):
    todo = Todo.query.get(id)
    if todo:
        db.session.delete(todo)
        db.session.commit()
        return {"message": "Todo deleted successfully!"}, 200
    else:
        return {"message": "Todo not found!"}, 404
    
@app.route('/update/<id>', methods=['PUT'])
def update_todo(id):
    data = request.get_json()
    todo = Todo.query.get(id)

    if not todo:
        return {"message": "Todo not found!"}, 404

    if "title" in data:
        todo.title = data["title"]
    if "desc" in data:
        todo.desc = data["desc"]

    db.session.commit()
    return {"message": "Todo updated successfully!"}, 200


if __name__ == "__main__":
    # Create tables if they don't exist
    with app.app_context():
        db.create_all()
    app.run(debug=True)

