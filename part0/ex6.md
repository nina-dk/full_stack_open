sequenceDiagram
  participant browser
  participant server

  browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa, {"content":"spa test","date":"2023-01-28T11:03:02.520Z"}
  activate server
  server-->>browser: {"message":"note created"}
  deactivate server