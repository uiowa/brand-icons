import { ref } from 'vue'


const getCats = () => {
    const cats = ref([])
    const error = ref(null)


    // const load = () => {
    //     const yaml = require('js-yaml');
    //     const fs   = require('fs');

    //     // Get document, or throw exception on error
    //     try {
    //         const doc = yaml.load(fs.readFileSync('/data/categories.yml', 'utf8'));
    //         console.log(doc);
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    // Load remotely, not working:
    // const load = async () => {
    //     const yaml = require('js-yaml');
    //       try{
    //       let data = await fetch('http://localhost:8888/brand-icons/categories.yml')
    
    //       if(!data.ok){
    //           throw Error('no data available')
    //       }
    //       console.log(data)
    
    //       cats.value = await data
    
    //       }
    //       catch(err){
    //       error.value = err.message
    //       console.log(error.value)
    //       }
    //   }

    return { cats, error, load }
}

export default getCats