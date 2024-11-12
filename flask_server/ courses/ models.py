from backend import db

class Course(db.Model):
    __tablename__ = 'courses'
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(200), nullable=False)
    icon = db.Column(db.String(200), nullable=False)
    enrolled = db.Column(db.Integer, default=0)
    graduated = db.Column(db.Integer, default=0)
    reviews = db.Column(db.Integer, default=0)

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'icon': self.icon,
            'enrolled': self.enrolled,
            'graduated': self.graduated,
            'reviews': self.reviews
        }
