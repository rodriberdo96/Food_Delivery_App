import React, { useRef } from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/frontend_assets/assets'

export const ExploreMenu = ({ category, setCategory }) => {
  const scrollRef = useRef(null)

  return (
    <section className="explore-menu" id="explore-menu">
      <div className="explore-menu__header">
        <h2 className="explore-menu__title">
          Explore Our <span className="gradient-text">Menu</span>
        </h2>
        <p className="explore-menu__text">
          Choose from a diverse menu featuring a delectable array of dishes crafted with the finest 
          ingredients and culinary expertise.
        </p>
      </div>

      <div className="explore-menu__scroll" ref={scrollRef}>
        {menu_list.map((item, index) => (
          <button
            key={index}
            onClick={() => setCategory(prev => prev === item.menu_name ? 'All' : item.menu_name)}
            className={`explore-menu__item ${category === item.menu_name ? 'explore-menu__item--active' : ''}`}
            style={{ animationDelay: `${index * 60}ms` }}
          >
            <div className="explore-menu__img-wrapper">
              <img src={item.menu_image} alt={item.menu_name} />
            </div>
            <span className="explore-menu__label">{item.menu_name}</span>
          </button>
        ))}
      </div>

      <div className="explore-menu__divider"></div>
    </section>
  )
}
