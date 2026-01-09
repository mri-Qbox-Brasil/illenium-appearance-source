import { useNuiState } from '../../hooks/nuiState';

import Section from './components/Section';
import Item from './components/Item';
import RangeInput from './components/RangeInput';
import ImageInput from './components/ImageInput';
import { IMAGE_CONFIG } from './configs/images';

import { PedHeadBlend, HeadBlendSettings } from './interfaces';

interface HeadBlendProps {
  settings: HeadBlendSettings;
  storedData: PedHeadBlend;
  data: PedHeadBlend;
  handleHeadBlendChange: (key: keyof PedHeadBlend, value: number) => void;
}

const HeadBlend = ({ settings, storedData, data, handleHeadBlendChange }: HeadBlendProps) => {
  const { locales } = useNuiState();

  if (!locales) {
    return null;
  }

  return (
    <Section title={locales.headBlend.title}>
      <Item title={locales.headBlend.shape.title}>
        <div className="grid grid-cols-2 gap-2 w-full mb-2">
          <ImageInput
            title={locales.headBlend.shape.firstOption}
            min={settings.shapeFirst.min}
            max={settings.shapeFirst.max}
            defaultValue={data.shapeFirst}
            clientValue={storedData.shapeFirst}
            onChange={value => handleHeadBlendChange('shapeFirst', value)}
            imageUrl={IMAGE_CONFIG.baseUrl + IMAGE_CONFIG.patterns.headBlend('face', data.shapeFirst)}
          />
          <ImageInput
            title={locales.headBlend.shape.secondOption}
            min={settings.shapeSecond.min}
            max={settings.shapeSecond.max}
            defaultValue={data.shapeSecond}
            clientValue={storedData.shapeSecond}
            onChange={value => handleHeadBlendChange('shapeSecond', value)}
            imageUrl={IMAGE_CONFIG.baseUrl + IMAGE_CONFIG.patterns.headBlend('face', data.shapeSecond)}
          />
        </div>
        <RangeInput
          title={locales.headBlend.shape.mix}
          min={settings.shapeMix.min}
          max={settings.shapeMix.max}
          factor={settings.shapeMix.factor}
          defaultValue={data.shapeMix}
          clientValue={storedData.shapeMix}
          onChange={value => handleHeadBlendChange('shapeMix', value)}
        />
      </Item>
      <Item title={locales.headBlend.skin.title}>
        <div className="grid grid-cols-2 gap-2 w-full mb-2">
          <ImageInput
            title={locales.headBlend.skin.firstOption}
            min={settings.skinFirst.min}
            max={settings.skinFirst.max}
            defaultValue={data.skinFirst}
            clientValue={storedData.skinFirst}
            onChange={value => handleHeadBlendChange('skinFirst', value)}
            imageUrl={IMAGE_CONFIG.baseUrl + IMAGE_CONFIG.patterns.headBlend('skin', data.skinFirst)}
          />
          <ImageInput
            title={locales.headBlend.skin.secondOption}
            min={settings.skinSecond.min}
            max={settings.skinSecond.max}
            defaultValue={data.skinSecond}
            clientValue={storedData.skinSecond}
            onChange={value => handleHeadBlendChange('skinSecond', value)}
            imageUrl={IMAGE_CONFIG.baseUrl + IMAGE_CONFIG.patterns.headBlend('skin', data.skinSecond)}
          />
        </div>
        <RangeInput
          title={locales.headBlend.skin.mix}
          min={settings.skinMix.min}
          max={settings.skinMix.max}
          factor={settings.skinMix.factor}
          defaultValue={data.skinMix}
          clientValue={storedData.skinMix}
          onChange={value => handleHeadBlendChange('skinMix', value)}
        />
      </Item>
      <Item title={locales.headBlend.race.title}>
        <div className="grid grid-cols-2 gap-2 w-full mb-2">
          <ImageInput
              title={locales.headBlend.race.shape}
              min={settings.shapeThird.min}
              max={settings.shapeThird.max}
              defaultValue={data.shapeThird}
              clientValue={storedData.shapeThird}
              onChange={value => handleHeadBlendChange('shapeThird', value)}
              imageUrl={IMAGE_CONFIG.baseUrl + IMAGE_CONFIG.patterns.headBlend('face', data.shapeThird)}
          />
          <ImageInput
            title={locales.headBlend.race.skin}
            min={settings.skinThird.min}
            max={settings.skinThird.max}
            defaultValue={data.skinThird}
            clientValue={storedData.skinThird}
            onChange={value => handleHeadBlendChange('skinThird', value)}
            imageUrl={IMAGE_CONFIG.baseUrl + IMAGE_CONFIG.patterns.headBlend('skin', data.skinThird)}
          />
        </div>
        <RangeInput
          title={locales.headBlend.race.mix}
          min={settings.thirdMix.min}
          max={settings.thirdMix.max}
          factor={settings.thirdMix.factor}
          defaultValue={data.thirdMix}
          clientValue={storedData.thirdMix}
          onChange={value => handleHeadBlendChange('thirdMix', value)}
        />
      </Item>
    </Section>
  );
};

export default HeadBlend;
