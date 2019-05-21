#!/usr/bin/python

import json

with open('users.json') as f:
  users = json.load(f)
  print(repr(users))

  new_user = { "id": 3, "firstname": "Wario", "lastname": "Super", "dob": "01/01/1985" }
  users.append(new_user)
  print(repr(users))

  with open("users_new.json", "w") as write_file:
    json.dump(users, write_file, indent=2)
