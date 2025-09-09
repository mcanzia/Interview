import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import JobApp from './components/JobPostings.jsx'
import TransferLists from './components/TransferLists.jsx'
import TransferListsReducer from './components/TransferListsReducer.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    {/* <JobApp /> */}
    {/* <TransferLists /> */}
    <TransferListsReducer />
  </StrictMode>,
)
