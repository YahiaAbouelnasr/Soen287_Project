TLDR of Models **[your data IS NOT stored here. BLUEPRINT of data]**: 
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Models = “data structure + database logic”

(They describe what your data looks like and how to access it.)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Longer explanation (but simple):

Models answer:
- What does a user look like?
- What fields does it have?
- Where is it stored?
- How do I read/write/update/delete it?

In school projects without a real database, models are usually:
- JavaScript classes
- or simple arrays
- or objects stored in files

🌻 What models DO (simple list):

- Define a shape for your data.
    (like a blueprint)

- Hold your data. [MISLEADING. it doesn't hold data.]
    (in memory or a real database)

- Provide small helper functions to get, save, update, or delete data.

Basically: 
If it describes the structure of data → it’s a model.
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

"work order" (chatGPT says):
"Frontend → Routes → Controller → Model → Controller → Routes → Frontend"
