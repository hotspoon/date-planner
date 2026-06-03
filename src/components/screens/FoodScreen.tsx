import { foods } from '../../data/datePlanner'

type FoodScreenProps = {
  selectedFoods: string[]
  onContinue: () => void
  onToggleFood: (id: string) => void
}

export function FoodScreen({
  selectedFoods,
  onContinue,
  onToggleFood,
}: FoodScreenProps) {
  return (
    <section className="screen choice-screen" aria-labelledby="food-title">
      <div>
        <h1 id="food-title">What are we feeling? 🍽️✨</h1>
        <p>(you can pick more than one btw)</p>
      </div>

      <div className="food-grid">
        {foods.map((food) => {
          const isSelected = selectedFoods.includes(food.id)

          return (
            <button
              className={`food-card ${isSelected ? 'selected' : ''}`}
              key={food.id}
              type="button"
              onClick={() => onToggleFood(food.id)}
              aria-pressed={isSelected}
            >
              <span aria-hidden="true">{food.icon}</span>
              {food.name}
            </button>
          )
        })}
      </div>

      <button
        className="primary-button"
        type="button"
        disabled={selectedFoods.length === 0}
        onClick={onContinue}
      >
        this one! →
      </button>
    </section>
  )
}
