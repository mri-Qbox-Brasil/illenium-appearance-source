import { useNuiState } from '../../hooks/nuiState';

import Section from './components/Section';
import Item from './components/Item';
import Input from './components/Input';
import ImageInput from './components/ImageInput';
import { IMAGE_CONFIG } from './configs/images';

import { ComponentConfig, ComponentSettings, PedComponent } from './interfaces';

interface ComponentsProps {
  settings: ComponentSettings[];
  data: PedComponent[];
  storedData: PedComponent[];
  handleComponentDrawableChange: (component_id: number, drawable: number) => void;
  handleComponentTextureChange: (component_id: number, texture: number) => void;
  componentConfig: ComponentConfig;
  hasTracker: boolean;
  isPedFreemodeModel: boolean | undefined;
}

interface DataById<T> {
  [key: number]: T;
}

const Components = ({
  settings,
  data,
  storedData,
  handleComponentDrawableChange,
  handleComponentTextureChange,
  componentConfig,
  hasTracker,
  isPedFreemodeModel
}: ComponentsProps) => {
  const { locales } = useNuiState();

  const settingsById = settings.reduce((object, { component_id, drawable, texture, blacklist }) => {
    return { ...object, [component_id]: { drawable, texture, blacklist } };
  }, {} as DataById<Omit<ComponentSettings, 'component_id'>>);

  const componentsById: any = data.reduce((object, { component_id, drawable, texture }) => {
    return { ...object, [component_id]: { drawable, texture } };
  }, {} as DataById<Omit<PedComponent, 'component_id'>>);

  const storedComponentsById: any = storedData.reduce((object, { component_id, drawable, texture }) => {
    return { ...object, [component_id]: { drawable, texture } };
  }, {} as DataById<Omit<PedComponent, 'component_id'>>);

  if (!locales) {
    return null;
  }

  const renderComponent = (id: number, title: string) => {
    if (!settingsById[id]) return null;

    return (
      <Item title={title}>
        <div className="flex flex-col gap-2">
          <ImageInput
            title={locales.components.drawable}
            min={settingsById[id].drawable.min}
            max={settingsById[id].drawable.max}
            defaultValue={componentsById[id].drawable}
            clientValue={storedComponentsById[id].drawable}
            onChange={value => handleComponentDrawableChange(id, value)}
            imageUrl={IMAGE_CONFIG.baseUrl + IMAGE_CONFIG.patterns.components(id, componentsById[id].drawable, componentsById[id].texture)}
          />
          <Input
            title={locales.components.texture}
            min={settingsById[id].texture.min}
            max={settingsById[id].texture.max}
            blacklisted={settingsById[id].blacklist.textures}
            defaultValue={componentsById[id].texture}
            clientValue={storedComponentsById[id].texture}
            onChange={value => handleComponentTextureChange(id, value)}
          />
        </div>
      </Item>
    );
  };

  return (
    <Section title={locales.components.title}>
      <div className="grid grid-cols-2 gap-4 pb-4">
        {!isPedFreemodeModel && renderComponent(0, locales.components.head)}
        {componentConfig.masks && renderComponent(1, locales.components.mask)}
        {componentConfig.upperBody && renderComponent(3, locales.components.upperBody)}
        {componentConfig.lowerBody && renderComponent(4, locales.components.lowerBody)}
        {componentConfig.bags && renderComponent(5, locales.components.bags)}
        {componentConfig.shoes && renderComponent(6, locales.components.shoes)}
        {componentConfig.scarfAndChains && !hasTracker && renderComponent(7, locales.components.scarfAndChains)}
        {componentConfig.shirts && renderComponent(8, locales.components.shirt)}
        {componentConfig.bodyArmor && renderComponent(9, locales.components.bodyArmor)}
        {componentConfig.decals && renderComponent(10, locales.components.decals)}
        {componentConfig.jackets && renderComponent(11, locales.components.jackets)}
      </div>
    </Section>
  );
};

export default Components;
