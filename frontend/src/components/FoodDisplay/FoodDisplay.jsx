import React from 'react'
import './FoodDisplay.css'
import { FoodItem } from '../FoodItem/FoodItem'
import { StoreContext } from '../../context/StoreContext'

export const FoodDisplay = ({ category }) => {
  const { food_list, loading, error, fetchFoodList } = React.useContext(StoreContext)

  if (loading) {
    return (
      <section id="food-display" className="food-display">
        <h2 className="food-display__title">
          Top dishes <span className="gradient-text">near you</span>
        </h2>
        <div className="food-display__grid">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="food-skeleton" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="food-skeleton__image skeleton"></div>
              <div className="food-skeleton__info">
                <div className="food-skeleton__title skeleton"></div>
                <div className="food-skeleton__desc skeleton"></div>
                <div className="food-skeleton__price skeleton"></div>
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section id="food-display" className="food-display">
        <div className="food-display__error">
          <div className="food-display__error-icon">⚠️</div>
          <h3>Oops! Something went wrong</h3>
          <p>{error}</p>
          <button className="btn-primary" onClick={fetchFoodList}>
            Try Again
          </button>
        </div>
      </section>
    )
  }

  const filtered = category === 'All'
    ? food_list
    : food_list.filter(item => item.category === category)

  return (
    <section id="food-display" className="food-display">
      <h2 className="food-display__title">
        Top dishes <span className="gradient-text">near you</span>
      </h2>
      {filtered.length === 0 ? (
        <div className="food-display__empty">
          <span className="food-display__empty-icon">🍽️</span>
          <p>No dishes found in this category</p>
        </div>
      ) : (
        <div className="food-display__grid">
          {filtered.map((item, index) => (
            <FoodItem
              key={item._id}
              id={item._id}
              name={item.name}
              price={item.price}
              description={item.description}
              image={item.image}
              index={index}
            />
          ))}
        </div>
      )}
    </section>
  )
}
