import React from 'react'
import { AppRoot, PanelHeader, Card, IconButton, Button, Paragraph } from '@vkontakte/vkui'
import { Icon24ArrowDownToSquareOutline } from '@vkontakte/icons'
import '@vkontakte/vkui/dist/vkui.css'
import './App.css'
import { InputForm } from './components/inputForm'
import { TodoList } from './components/todoList'

function App() {
  const [supportPWA, setSupportPWA] = React.useState(false)
  const [promptInstall, setPromptInstall] = React.useState<any>(null)

  React.useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault()
      setPromptInstall(null)
    }

    window.addEventListener('addinstalled', () => {
      setPromptInstall(null)
    })

    window.addEventListener('beforeinstallprompt', (e: any) => {
      e.preventDefault()
      setPromptInstall(e)
    })

    window.addEventListener('load', () => {
      const pwaSupportFlag = localStorage.getItem('supportsPWA')
      if (pwaSupportFlag) {
        setSupportPWA(JSON.parse(pwaSupportFlag))
        return
      }
    
    interface customNavigator extends Navigator {
      standalone? : boolean
    }  

    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
    const iOSWebApp = (window.navigator as customNavigator).standalone === true && isSafari
    const supportsIOSWebApp = window.matchMedia('(display-mode: standalone)').matches && iOSWebApp

    const supportPWA = ('serviceWorker' in navigator) && ('beforeinstallprompt' in window) && !supportsIOSWebApp
    localStorage.setItem('supportsPWA', JSON.stringify(supportPWA))
    setSupportPWA(supportPWA)
    })

    return () => {
    window.removeEventListener('appinstalled', handler)
  }
 }, [])

 const handleInstallClick = async (e: any) => {
  e.preventDefault()
  if (promptInstall) {
    promptInstall.prompt()
  const choiseResult = await promptInstall.useChoise
  if (choiseResult && choiseResult.outcome === 'accepted') {
    console.log('PWA was accepted');
  } else {
    console.log('PWA was dismissed');
  }
  }
 }

  return (
    <AppRoot>
      <PanelHeader>
        Ежедневник
        { promptInstall && (
        <Button 
        style={{position: 'absolute', right: '0px'}} 
        className='downloadButton'
        onClick={handleInstallClick}
        >
          <Icon24ArrowDownToSquareOutline/>
        </Button>)}
      </PanelHeader>
      <Card mode='tint' className='inputContainer'>
        <InputForm/>
        <TodoList/>
      </Card>
    </AppRoot>
  )
}

export default App
