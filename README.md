# BookcaseRestApi

### Add a new book  
###### POST/books 
* 'title':='String', 
* 'author': ='String', 
* 'price'='Number'
---------------------------------------------
### Delete a book  
###### DELETE/books/_id
---------------------------------------------
### Patch book 
###### PATCH/books/_id
* "propName":("title","author","price")
* "value": "..."
---------------------------------------------
###  See all existed books
###### GET/books
---------------------------------------------

### Add a new library
###### POST/library

---------------------------------------------
### Delete a library
###### DELETE/library/_libraryid

---------------------------------------------
### Add a book to library
###### POST/library/_bookid
