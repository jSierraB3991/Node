Create Table Imagenes
(
    ID INT AUTO_INCREMENT PRIMARY KEY
    , Titulo Varchar(100)
    , Descripcion Varchar(400)
    , Imagen varchar(5000)
    , FechaCreacion TIME_STAMP CURRENT_STAMP NOT NULL
    , Estado SMALL_INT
)