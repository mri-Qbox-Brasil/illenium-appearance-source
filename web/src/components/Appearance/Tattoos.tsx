import { useNuiState } from '../../hooks/nuiState';
import Section from './components/Section';
import Item from './components/Item';
import SelectTattoo from './components/SelectTattoo';

import { TattoosSettings, TattooList, Tattoo } from './interfaces';
import Button from './components/Button';

interface TattoosProps {
  settings: TattoosSettings;
  data: TattooList;
  storedData: TattooList;
  handleApplyTattoo: (value: Tattoo, opacity: number) => void;
  handlePreviewTattoo: (value: Tattoo, opacity: number) => void;
  handleDeleteTattoo: (value: Tattoo) => void;
  handleClearTattoos: () => void;
}

const Tattoos = ({ settings, data, storedData, handleApplyTattoo, handlePreviewTattoo, handleDeleteTattoo, handleClearTattoos }: TattoosProps) => {
  const { locales } = useNuiState();

  const { items } = settings;
  const keys = Object.keys(items);

  if (!locales) {
    return null;
  }

  return (
    <Section title={locales.tattoos.title}>
      {keys.map(key => (
        key !== 'ZONE_HAIR'
        &&
        <Item key={key} title={locales.tattoos.items[key]}>
          <div className="flex flex-col gap-2">
            <SelectTattoo
              handlePreviewTattoo={handlePreviewTattoo}
              handleApplyTattoo={handleApplyTattoo}
              handleDeleteTattoo={handleDeleteTattoo}
              items={items[key]}
              tattoosApplied={data[key] ?? null}
              settings={settings}
            />
          </div>
        </Item>
      ))}
      <Item>
        <div className="flex w-full mt-2">
          <Button onClick={() => handleClearTattoos()} className="w-full" variant="destructive">
            {locales.tattoos.deleteAll}
          </Button>
        </div>
      </Item>
    </Section>
  );
};

export default Tattoos;
