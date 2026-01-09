import { useNuiState } from '../../hooks/nuiState';

import Section from './components/Section';
import Item from './components/Item';
import Input from './components/Input';
import ImageInput from './components/ImageInput';
import { IMAGE_CONFIG } from './configs/images';

import { PropSettings, PedProp, PropConfig } from './interfaces';

interface PropsProps {
  settings: PropSettings[];
  data: PedProp[];
  storedData: PedProp[];
  handlePropDrawableChange: (prop_id: number, drawable: number) => void;
  handlePropTextureChange: (prop_id: number, texture: number) => void;
  propConfig: PropConfig;
}

interface DataById<T> {
  [key: number]: T;
}

const Props = ({ settings, data, storedData, handlePropDrawableChange, handlePropTextureChange, propConfig }: PropsProps) => {
  const { locales } = useNuiState();

  const settingsById = settings.reduce((object, { prop_id, drawable, texture, blacklist }) => {
    return { ...object, [prop_id]: { drawable, texture, blacklist } };
  }, {} as DataById<Omit<PropSettings, 'prop_id'>>);

  const propsById: any = data.reduce((object, { prop_id, drawable, texture }) => {
    return { ...object, [prop_id]: { drawable, texture } };
  }, {} as DataById<Omit<PedProp, 'prop_id'>>);

  const storedPropsById: any = storedData.reduce((object, { prop_id, drawable, texture }) => {
    return { ...object, [prop_id]: { drawable, texture } };
  }, {} as DataById<Omit<PedProp, 'prop_id'>>);

  if (!locales) {
    return null;
  }

  const renderProp = (id: number, title: string) => {
    if (!settingsById[id]) return null;

    return (
      <Item title={title}>
        <div className="flex flex-col gap-2">
          <ImageInput
            title={locales.props.drawable}
            min={settingsById[id].drawable.min}
            max={settingsById[id].drawable.max}
            defaultValue={propsById[id].drawable}
            clientValue={storedPropsById[id].drawable}
            onChange={value => handlePropDrawableChange(id, value)}
            imageUrl={IMAGE_CONFIG.baseUrl + IMAGE_CONFIG.patterns.props(id, propsById[id].drawable, propsById[id].texture)}
          />
          <Input
            title={locales.props.texture}
            min={settingsById[id].texture.min}
            max={settingsById[id].texture.max}
            blacklisted={settingsById[id].blacklist.textures}
            defaultValue={propsById[id].texture}
            clientValue={storedPropsById[id].texture}
            onChange={value => handlePropTextureChange(id, value)}
          />
        </div>
      </Item>
    );
  };

  return (
    <Section title={locales.props.title}>
      <div className="grid grid-cols-2 gap-4 pb-4">
        {propConfig.hats && renderProp(0, locales.props.hats)}
        {propConfig.glasses && renderProp(1, locales.props.glasses)}
        {propConfig.ear && renderProp(2, locales.props.ear)}
        {propConfig.watches && renderProp(6, locales.props.watches)}
        {propConfig.bracelets && renderProp(7, locales.props.bracelets)}
      </div>
    </Section>
  );
};

export default Props;
