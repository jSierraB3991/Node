DELIMITER $$
CREATE PROCEDURE MostrarImagenes(IN Id_img INt)
BEGIN
	IF Id_img = 0 THEN 
    	SELECT `ID`, `Titulo`, `Descripcion`, `Imagen`, `FechaCreacion`
        From Imagenes
        WHERE Estado = 1;
    ELSE
    	SELECT `ID`, `Titulo`, `Descripcion`, `Imagen`, `FechaCreacion`
        From Imagenes
        WHERE id = Id_img;
    END IF;
End$$