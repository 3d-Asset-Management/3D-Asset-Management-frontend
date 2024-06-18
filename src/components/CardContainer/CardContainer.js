import './CardContainer.css'
import Card from '../Card/Card';
import SearchBar from '../SearchBar/SearchBar';

 const data = [{
    title: 'Realtime Collaboration',
    description: 'Work with your team in real-time and individual.',
    srcLink: 'https://spline.design/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeature_01.2c08745d.jpg&w=1080&q=100'
 },
 {
    title: '3D Modeling',
    description: 'Parametric objects, polygonal editing, and more.',
    srcLink: 'https://spline.design/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeature_02.cc4a57dc.jpg&w=1080&q=100'
 },
 {
    title: 'Animation',
    description: 'Give life to your 3d objects.',
    srcLink: 'https://spline.design/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeature_03.651311c1.jpg&w=1080&q=100'
 },
 {
    title: 'Interactive Experiences',
    description: 'Enable interactivity on your objects.',
    srcLink: 'https://spline.design/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeature_04.09ef23fc.jpg&w=1080&q=100'
 },
 {
    title: 'Material Layers',
    description: 'Fine-tune the look of your models.',
    srcLink: 'https://spline.design/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeature_05_b.765e9f35.jpg&w=1080&q=100'
 },
 {
    title: '3D Sculpting',
    description: 'Create organic shapes.',
    srcLink: 'https://spline.design/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeature_06.6ca66f8a.jpg&w=1080&q=100'
 },
 {
    title: 'Physics',
    description: 'Create real-time physics simulations and interactions.',
    srcLink: 'https://spline.design/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeature_07.f5573995.jpg&w=1080&q=100'
 },
 {
    title: 'Game Controls',
    description: 'Easily create 3rd person and 1st person experiences.',
    srcLink: 'https://spline.design/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeature_08.b1c27e87.jpg&w=1080&q=100'
 },{
    title: 'Realtime Collaboration',
    description: 'Work with your team in real-time and create individual.',
    srcLink: 'https://spline.design/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeature_01.2c08745d.jpg&w=1080&q=100'
 }

];

export default function CardContainer() { 
    return (
        <div className='container'>
            <div className='card__btns'>
                <div className='card__btns-left'> 
                 3D Designs
                </div>
              <SearchBar/>   
            </div>

            <div className='card__container'>

               { data.map((item) => {
                    return <Card id={item.key} title={item.title} description={item.description} srcLink={item.srcLink}/>
               })}
            </div>
        </div>
    );
}