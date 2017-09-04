# reingold_tilford_demonstrator

Il dimostratore è ottimizzato per alberi binari in cui ogni nodo deve avere uno questi 3 schemi:

- SCHEMA 1 (FOGLIA):
{
  "name": "nome_nodo_1",
  "children": [] // Campo non obbligatorio 
}

- SCHEMA 2 (NODO CON 1 FIGLIO):
{
  "name": "nome_nodo_1",
  "children": [
    { 
      "name": "nome_nodo_2",
      "children": [{..}]
    }
  ]
}

- SCHEMA 3 (NODO CON 2 FIGLI):
{
  "name": "nome_nodo_1",
  "children": [
    { 
      "name": "nome_nodo_2",
      "children": [{..}]
    },
    { 
      "name": "nome_nodo_3",
      "children": [{..}]
    }
  ]
}

Il campo "children" non è obbligatorio per i nodi foglia
