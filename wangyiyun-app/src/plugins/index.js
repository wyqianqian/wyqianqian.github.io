import {
    Button, Swipe, SwipeItem, Popup, Toast
} from 'vant'

const plugins = [
    Button, Swipe, SwipeItem, Popup, Toast
];

export default function getVant(app) {
    plugins.forEach(item => app.use(item));
}