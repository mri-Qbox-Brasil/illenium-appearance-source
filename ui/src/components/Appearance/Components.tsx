import { ComponentSettings } from './interfaces';

import Section from './components/Section';
import Item from './components/Item';
import { FlexWrapper } from './styles';
import Input from './components/Input';

interface ComponentsProps {
  getComponentSettings: (component_id: number) => ComponentSettings | undefined;
  getComponentDrawable: (component_id: number) => number | undefined;
  getComponentTexture: (component_id: number) => number | undefined;
  handleComponentDrawableChange: (component_id: number, drawable: number) => void;
  handleComponentTextureChange: (component_id: number, texture: number) => void;
}

const Components: React.FC<ComponentsProps> = ({
  getComponentSettings,
  getComponentDrawable,
  getComponentTexture,
  handleComponentDrawableChange,
  handleComponentTextureChange,
}) => (
  <Section title="Vestuário">
    <Item title="Máscara">
      <FlexWrapper>
        <Input
          title="Modelo"
          min={getComponentSettings(1)?.drawable.min}
          max={getComponentSettings(1)?.drawable.max}
          defaultValue={getComponentDrawable(1)}
          onChange={value => handleComponentDrawableChange(1, value)}
        />
        <Input
          title="Textura"
          min={getComponentSettings(1)?.texture.min}
          max={getComponentSettings(1)?.texture.max}
          defaultValue={getComponentTexture(1)}
          onChange={value => handleComponentTextureChange(1, value)}
        />
      </FlexWrapper>
    </Item>
    <Item title="Mãos">
      <FlexWrapper>
        <Input
          title="Modelo"
          min={getComponentSettings(3)?.drawable.min}
          max={getComponentSettings(3)?.drawable.max}
          defaultValue={getComponentDrawable(3)}
          onChange={value => handleComponentDrawableChange(3, value)}
        />
        <Input
          title="Textura"
          min={getComponentSettings(3)?.texture.min}
          max={getComponentSettings(3)?.texture.max}
          defaultValue={getComponentTexture(3)}
          onChange={value => handleComponentTextureChange(3, value)}
        />
      </FlexWrapper>
    </Item>
    <Item title="Pernas">
      <FlexWrapper>
        <Input
          title="Modelo"
          min={getComponentSettings(4)?.drawable.min}
          max={getComponentSettings(4)?.texture.max}
          defaultValue={getComponentDrawable(4)}
          onChange={value => handleComponentDrawableChange(4, value)}
        />
        <Input
          title="Textura"
          min={getComponentSettings(4)?.texture.min}
          max={getComponentSettings(4)?.texture.max}
          defaultValue={getComponentTexture(4)}
          onChange={value => handleComponentTextureChange(4, value)}
        />
      </FlexWrapper>
    </Item>
    <Item title="Mochila">
      <FlexWrapper>
        <Input
          title="Modelo"
          min={getComponentSettings(5)?.drawable.min}
          max={getComponentSettings(5)?.drawable.max}
          defaultValue={getComponentDrawable(5)}
          onChange={value => handleComponentDrawableChange(5, value)}
        />
        <Input
          title="Textura"
          min={getComponentSettings(5)?.texture.min}
          max={getComponentSettings(5)?.texture.max}
          defaultValue={getComponentTexture(5)}
          onChange={value => handleComponentTextureChange(5, value)}
        />
      </FlexWrapper>
    </Item>
    <Item title="Calçados">
      <FlexWrapper>
        <Input
          title="Modelo"
          min={getComponentSettings(6)?.drawable.min}
          max={getComponentSettings(6)?.drawable.max}
          defaultValue={getComponentDrawable(6)}
          onChange={value => handleComponentDrawableChange(6, value)}
        />
        <Input
          title="Textura"
          min={getComponentSettings(6)?.texture.min}
          max={getComponentSettings(6)?.texture.max}
          defaultValue={getComponentTexture(6)}
          onChange={value => handleComponentTextureChange(6, value)}
        />
      </FlexWrapper>
    </Item>
    <Item title="Acessórios">
      <FlexWrapper>
        <Input
          title="Modelo"
          min={getComponentSettings(7)?.drawable.min}
          max={getComponentSettings(7)?.drawable.max}
          defaultValue={getComponentDrawable(7)}
          onChange={value => handleComponentDrawableChange(7, value)}
        />
        <Input
          title="Textura"
          min={getComponentSettings(7)?.texture.min}
          max={getComponentSettings(7)?.texture.max}
          defaultValue={getComponentTexture(7)}
          onChange={value => handleComponentTextureChange(7, value)}
        />
      </FlexWrapper>
    </Item>
    <Item title="Camisa">
      <FlexWrapper>
        <Input
          title="Modelo"
          min={getComponentSettings(8)?.drawable.min}
          max={getComponentSettings(8)?.drawable.max}
          defaultValue={getComponentDrawable(8)}
          onChange={value => handleComponentDrawableChange(8, value)}
        />
        <Input
          title="Textura"
          min={getComponentSettings(8)?.texture.min}
          max={getComponentSettings(8)?.texture.max}
          defaultValue={getComponentTexture(8)}
          onChange={value => handleComponentTextureChange(8, value)}
        />
      </FlexWrapper>
    </Item>
    <Item title="Coletes">
      <FlexWrapper>
        <Input
          title="Modelo"
          min={getComponentSettings(9)?.drawable.min}
          max={getComponentSettings(9)?.drawable.max}
          defaultValue={getComponentDrawable(9)}
          onChange={value => handleComponentDrawableChange(9, value)}
        />
        <Input
          title="Textura"
          min={getComponentSettings(9)?.texture.min}
          max={getComponentSettings(9)?.texture.max}
          defaultValue={getComponentTexture(9)}
          onChange={value => handleComponentTextureChange(9, value)}
        />
      </FlexWrapper>
    </Item>
    <Item title="Emblemas">
      <FlexWrapper>
        <Input
          title="Modelo"
          min={getComponentSettings(10)?.drawable.min}
          max={getComponentSettings(10)?.drawable.max}
          defaultValue={getComponentDrawable(10)}
          onChange={value => handleComponentDrawableChange(10, value)}
        />
        <Input
          title="Textura"
          min={getComponentSettings(10)?.texture.min}
          max={getComponentSettings(10)?.texture.max}
          defaultValue={getComponentTexture(10)}
          onChange={value => handleComponentTextureChange(10, value)}
        />
      </FlexWrapper>
    </Item>
    <Item title="Jaquetas">
      <FlexWrapper>
        <Input
          title="Modelo"
          min={getComponentSettings(11)?.drawable.min}
          max={getComponentSettings(11)?.drawable.max}
          defaultValue={getComponentDrawable(11)}
          onChange={value => handleComponentDrawableChange(11, value)}
        />
        <Input
          title="Textura"
          min={getComponentSettings(11)?.texture.min}
          max={getComponentSettings(11)?.texture.max}
          defaultValue={getComponentTexture(11)}
          onChange={value => handleComponentTextureChange(11, value)}
        />
      </FlexWrapper>
    </Item>
  </Section>
);

export default Components;
