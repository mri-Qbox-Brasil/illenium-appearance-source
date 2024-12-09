import { NuiStateProvider } from './hooks/nuiState';
import GlobalStyles from './styles/global';

import Appearance from './components/Appearance';
import { ThemeProvider } from 'styled-components';
import Nui from './Nui';
import { useCallback, useEffect, useState } from 'react';

const defaultTheme: any = {
  id: 'default',
  borderRadius: '4px',
  fontColor: '255, 255, 255',
  fontColorHover: '255, 255, 255',
  fontColorSelected: '0, 0, 0',
  fontFamily: 'Inter',
  primaryBackground: '0, 0, 0',
  primaryBackgroundSelected: '255, 255, 255',
  secondaryBackground: '0, 0, 0',
  scaleOnHover: false,
  sectionFontWeight: 'normal',
  smoothBackgroundTransition: false,
};

const App: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);

  const getCurrentTheme = (themeData: any) => {
    if (!themeData || !Array.isArray(themeData.themes)) {
      console.warn('Dados inválidos para getCurrentTheme:', themeData);
      return defaultTheme;
    }
  
    return themeData.themes.find((theme: any) => theme.id === themeData.currentTheme) || defaultTheme;
  };
  

  const loadTheme = useCallback(async () => {
    try {
      const themeData = await Nui.post('get_theme_configuration');
      console.log('Como vem o tema? ', themeData);
  
      // Se o tema não for retornado ou for inválido, usar o tema padrão
      if (!themeData || !themeData.themes || !Array.isArray(themeData.themes)) {
        console.warn('Nenhum dado válido de tema recebido. Usando tema padrão.');
        setCurrentTheme(defaultTheme);
        return;
      }
  
      // Obter o tema correspondente
      const selectedTheme = getCurrentTheme(themeData);
      if (selectedTheme) {
        setCurrentTheme(selectedTheme);
      } else {
        console.warn('Tema correspondente não encontrado. Usando tema padrão.');
        setCurrentTheme(defaultTheme);
      }
    } catch (error) {
      console.error('Erro ao carregar o tema:', error);
      setCurrentTheme(defaultTheme); // Usar tema padrão em caso de erro
    }
  }, []);
  

  useEffect(() => {
    loadTheme().catch(console.error);
  }, [loadTheme]);

  return (
    <NuiStateProvider>
      <ThemeProvider theme={currentTheme}>
        <Appearance />
        <GlobalStyles />
      </ThemeProvider>
    </NuiStateProvider>
  );
};

export default App;
