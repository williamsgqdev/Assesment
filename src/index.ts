import { Config, swaggerDocs } from './common';
import { createApp } from './creatApp';
const app = createApp();

app.listen(Config.PORT, ()=> {
    console.log('🚀 Server is running on port 3000');
})