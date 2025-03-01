import { Api } from './components/base/api';
import { EventEmitter } from './components/base/events';
import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { cloneTemplate, ensureElement } from './utils/utils';

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const gallery = document.querySelector('.gallery')


fetch(`https://larek-api.nomoreparties.co/api/weblarek/product`)
	.then((res) => res.json())
	.then((res) => {
		console.log(res)
	})
	.catch((error) => {
		console.log(error);
	});
