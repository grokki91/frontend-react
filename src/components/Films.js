import React from "react";

const Films = () => {
  const films = [
    { title: "Harry Potter", time: 130},
    { title: "The lord of the rings", time: 190},
    { title: "Spider-Man", time: 95}
  ];

  const style = {
    container: {
      fontSize: "20px",
      marginTop: "50px",
      marginBottom: "10px",
      display: "flex",
      justifyContent: "center",
    },
  };

  return (
    <div>
      {films.map((film, id) => {
        return (
          <div key={id} style={style.container}>
            <div>title: {film.title},</div>
            <div>title: {film.time},</div>
          </div>
        );
      })}
    </div>
  )
};

export default Films;
