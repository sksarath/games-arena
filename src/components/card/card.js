import React from 'react';
import './card.css';

const Card = (props) => {
  const {title, url, platform, score, genre, editors_choice:choice, release_year:year} = props["game-data"];
  const scorenum = parseInt(score);
  return(
    <div className="indiv-card">
      <a href={`http://www.ign.com/${url}`} target="_blank">
        <div className="img-holder">
          <img src={require(`../../img/no-img.svg`)} />
        </div>
        <div className="content-holder">
          <h4 className="game-title">{title}</h4>
          <div className="card-label comm-spacing">
            <label className="inline-block gray-text">
              Platform: &nbsp;
            </label>
            <div className="inline-block black-text">
              {platform}
            </div>
          </div>
          <div className="comm-spacing">
            <span className="gray-text">Score: </span> 
            <span className="black-text">{score}</span>
          </div>
          <div className="comm-spacing">
            <span className="gray-text">Genre: </span> 
            <span className="black-text">{genre}</span>
          </div>
          <div className="comm-spacing">
            <span className="gray-text">Editors choice: </span> 
            <span className={choice==='Y' ? 'green-text' : 'red-text'}>{choice}</span>
          </div>
          <div className="comm-spacing">
            <span className="gray-text">Year: </span>
            <span className="black-text">{year}</span>
          </div>
        </div>
        <div className="rating" style={{width:scorenum * 10 + '%'}}>
        </div>
        </a>
    </div>
  )
}
export default Card;