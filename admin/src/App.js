import React, { useEffect} from 'react'
import { BrowserRouter,Routes,Route, } from 'react-router-dom'
import { FiSettings } from 'react-icons/fi'
import { TooltipComponent } from '@syncfusion/ej2-react-popups'
import './App.css'
import { Navbar, Footer, Sidebar, ThemeSettings } from './components'
import { Dashboard, Appointments, Calendar, Employee, Stacked, Pyramid, Customers,
     Kanban, Area, Bar, Pie, Financial, ColorMapping, Editor, Properties, ColorPicker, Line } from './pages'
import { useStateContext } from './contexts/ContextProvider'
const App = () => {
    const {activeMenu} = useStateContext()
  return (
    <div>
        <BrowserRouter>
            <div className="flex relative dark:bg-main-dark-bg">
                <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
                    <TooltipComponent content="Settings"position="Top">
                        <button type="button" className="text-3xl  p-3 hover:drop-shadow-xl text-white hover:bg-light-gray" style={{ background: 'blue', borderRadius: '50%' }}>
                            <FiSettings />
                        </button>
                    </TooltipComponent>
                </div>
                {activeMenu ? (
                <div className='w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white'>
                    <Sidebar />
                </div>) : (
                <div className="w-0 dark:bg-secondary-dark-bg"> 
                    <Sidebar />
                </div>)
                }
                <div
            className={
                `dark:bg-main-bg bg-main-bg min-h-screen w-full ${ activeMenu ? 'md:ml-72': 'flex-2'}`
            }
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar />
            </div>

          <div>
            <Routes>
               {/* dashboard  */}
               <Route path="/" element={(<Dashboard />)} />
                <Route path="/ecommerce" element={(<Dashboard />)} />

                {/* pages  */}
                <Route path="/appointments" element={<Appointments />} />
                <Route path="/employees" element={<Employee />} />
                <Route path="/customers" element={<Customers />} />

                {/* apps  */}
                <Route path="/kanban" element={<Kanban />} />
                <Route path="/editor" element={<Editor />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/color-picker" element={<ColorPicker />} />

                {/* charts  */}
                <Route path="/line" element={<Line />} />
                <Route path="/area" element={<Area />} />
                <Route path="/bar" element={<Bar />} />
                <Route path="/pie" element={<Pie />} />
                <Route path="/financial" element={<Financial />} />
                <Route path="/color-mapping" element={<ColorMapping />} />
                <Route path="/pyramid" element={<Pyramid />} />
                <Route path="/stacked" element={<Stacked />} />
                
            </Routes>
          </div>
          </div>

            </div>
        </BrowserRouter>
    </div>
  )
}

export default App