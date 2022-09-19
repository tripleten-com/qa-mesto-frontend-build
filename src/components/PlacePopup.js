import { useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

const initialCardData = {
  name: '',
  link: '',
  description: '',
  address: '',
  type: '',
}

function PlacePopup({ isOpen, onAddPlace, onEditPlace, onClose, card }) {
  const [cardData, setCardData] = useState(initialCardData)

  useEffect(() => {
    if (isOpen) {
      setCardData(card
        ? {
          name: card.name,
          link: card.link,
          description: card.description || '',
          address: card.address || '',
          type: card.type,
        }
        : initialCardData
      );
    }
  }, [isOpen, card])

  function handleSubmit(e) {
    e.preventDefault();

    if (card) {
      onEditPlace(cardData, card._id);
      return;
    }
    onAddPlace(cardData);
  }

  const handleChange = (e, field) => setCardData((card) => ({ ...card, [field]: e.target.value }));

  const { name, address, link, description, type } = cardData;
  const isSaveAvailable = Boolean(name && link && type);

  return (
    <PopupWithForm
      isOpen={isOpen} disabled={!isSaveAvailable} onSubmit={handleSubmit} onClose={onClose} title={card ? "Изменить место" : "Новое место"} name="new-card"
    >
      <label className="popup__label">
        <input type="text" name="name" id="place-name"
               className="popup__input popup__input_type_card-name" placeholder="Название"
               required minLength="1" maxLength="30" value={name} onChange={(e) => handleChange(e, 'name')} />
        <span className="popup__error" id="place-name-error"></span>
      </label>
      <label className="popup__label">
        <input type="url" name="link" id="place-link"
               className="popup__input popup__input_type_url" placeholder="Ссылка на картинку"
               required value={link} onChange={(e) => handleChange(e, 'link')} />
        <span className="popup__error" id="place-link-error"></span>
      </label>
      <label className="popup__label">
        <input type="text" name="description" id="place-description"
               className="popup__input popup__input_type_card-name" placeholder="Описание"
               value={description} onChange={(e) => handleChange(e, 'description')} />
        <span className="popup__error" id="place-description-error"></span>
      </label>
      <label className="popup__label">
        <input type="text" name="address" id="place-address"
               className="popup__input popup__input_type_card-name" placeholder="Адрес"
               value={address} onChange={(e) => handleChange(e, 'address')} />
        <span className="popup__error" id="place-address-error"></span>
      </label>
      <p className="popup__radio-input-title">Место:</p>
      <input type="radio" id="place-type-1" className="popup__radio-input"
        name="type" value="public" checked={type === 'public'} onChange={(e) => handleChange(e, 'type')} />
      <label for="place-type-1" className="popup__radio-input-label">Общедоступное</label>
      <input type="radio" id="place-type-2" className="popup__radio-input"
        name="type" value="private" checked={type === 'private'} onChange={(e) => handleChange(e, 'type')} />
      <label for="place-type-2" className="popup__radio-input-label">Частное</label>
    </PopupWithForm>
  );
}

export default PlacePopup;
