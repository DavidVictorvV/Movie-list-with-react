const Filter = ({ checked, setChecked, setShowFO }) => {
  const checkList = [
    "action",
    "adventure",
    "animation",
    "biography",
    "comedy",
    "crime",
    "documentary",
    "drama",
    "family",
    "fantasy",
    "film_noir",
    "game_show",
    "history",
    "horror",
    "music",
    "musical",
    "mystery",
    "news",
    "reality_tv",
    "romance",
    "sci_fi",
    "sport",
    "talk_show",
    "thriller",
    "war",
    "western",
  ];
  const handleCheck = (event) => {
    var updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    setChecked(updatedList);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowFO(false);
    document.body.classList.toggle("stop-scroll");
  };

  return (
    <div>
      <div
        className="blur"
        onClick={() => {
          setShowFO(false);
        }}
      ></div>
      <dialog open>
        <h3>Filters:</h3>
        <div className="filter-options">
          <h5 className="filter-label">Genres:</h5>
          <div className="list-container">
            {checkList.map((item, index) => (
              <div key={index}>
                <label>
                  <input
                    value={item}
                    type="checkbox"
                    checked={checked.includes(item)}
                    onChange={handleCheck}
                  />
                  <span>{item[0].toUpperCase() + item.substring(1)}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="dialog-end">
          <button
            onClick={() => {
              setChecked([]);
            }}
          >
            Reset
          </button>
          <button onClick={handleSubmit}>Done</button>
        </div>
      </dialog>
    </div>
  );
};

export default Filter;
