from wtforms import Form
from wtforms.fields import TextField
from wtforms.validators import Required

class CleverbotForm(Form):
  query = TextField('Query', validators=[Required()])