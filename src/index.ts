import { Api } from './components/base/api';
import './scss/styles.scss';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';

const gallery = document.querySelector('.gallery')
const modal = document.querySelector('.modal') as HTMLElement
const basket = document.querySelector('.header__basket') as HTMLElement
const api = new Api(API_URL)
api.get(`/product`)
	.then((res)=>{
		console.log(res)
	})
	.catch((err)=>{
		console.log(err)
	})
