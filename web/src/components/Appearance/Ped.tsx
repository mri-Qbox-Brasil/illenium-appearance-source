import { useNuiState } from '../../hooks/nuiState';

import Section from './components/Section';
import Item from './components/Item';
import { FaMale, FaFemale, FaUser } from 'react-icons/fa';
import ImageSelector from './components/ImageSelector';

import { PedSettings } from './interfaces';

interface PedProps {
  settings: PedSettings;
  storedData: string;
  data: string;
  handleModelChange: (value: string) => void;
  forcedOpen?: boolean;
}

const Ped = ({ settings, storedData, data, handleModelChange, forcedOpen }: PedProps) => {
  const { locales } = useNuiState();

  if (!locales) {
    return null;
  }

  const modelItems = settings.model.items.map(model => {
    let icon = <FaUser />;
    if (model.includes('_m_') || model.toLowerCase().includes('male')) {
      icon = <FaMale />;
    } else if (model.includes('_f_') || model.toLowerCase().includes('female')) {
      icon = <FaFemale />;
    }

    return {
      id: model,
      icon: icon
    };
  });

  return (
    <Section title={locales.ped.title} forcedOpen={forcedOpen}>
      <Item title={locales.ped.model}>
        <ImageSelector
          items={modelItems}
          selectedValue={data}
          onSelect={handleModelChange}
          onAdd={() => console.log('Add custom model')}
        />
      </Item>
    </Section>
  );
};

export default Ped;
