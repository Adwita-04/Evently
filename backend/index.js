const express=require('express');
const cors=require('cors');
const dotenv=require('dotenv');
const mongoose=require('mongoose')
const path=require('path');
const authRoutes=require('./routes/auth.js')

dotenv.config();

const app=express();
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/auth',authRoutes);
app.use('/api/events',require('./routes/events.js'));
app.use('/api/bookings',require('./routes/bookings.js'));

// File: backend/index.js
// In Render's single-service deployment, Express serves the Vite build so the
// React frontend and existing /api routes share one public URL.
const frontendBuildPath=path.join(__dirname,'../frontend/dist');
app.use(express.static(frontendBuildPath));

// Send non-API browser routes to React. This preserves client-side routes when
// a user refreshes or opens a URL directly, without changing API behavior.
app.get(/^(?!\/api(?:\/|$)).*/, (req,res)=>{
    res.sendFile(path.join(frontendBuildPath,'index.html'));
});

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('Connected to MongoDB');
})
.catch((error)=>{
    console.error('Error connecting to MongoDB:',error);
});

const PORT=process.env.PORT || 5000;
// Render provides PORT and requires the server to accept traffic on 0.0.0.0.
app.listen(PORT,'0.0.0.0',()=>{
   console.log(`Server is running on port ${PORT}`);
})
