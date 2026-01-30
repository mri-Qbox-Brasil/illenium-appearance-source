import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTransition as useTransitionAnimation, animated } from 'react-spring';
import { useNuiState } from '../../hooks/nuiState';
import Nui from '../../Nui';
import mock from '../../mock';
import mockConfig from '../../../mock-data/configs.json';
import mockLocales from '../../../mock-data/locales.json';

import {
  CustomizationConfig,
  PedAppearance,
  AppearanceSettings,
  PedHeadBlend,
  PedFaceFeatures,
  PedHeadOverlays,
  PedHeadOverlayValue,
  PedHair,
  CameraState,
  ClothesState,
  Tattoo,
  TattoosSettings,
} from './interfaces';

import {
  APPEARANCE_INITIAL_STATE,
  SETTINGS_INITIAL_STATE,
  CAMERA_INITIAL_STATE,
  ROTATE_INITIAL_STATE,
  CLOTHES_INITIAL_STATE,
} from './settings';

import Ped from './Ped';
import HeadBlend from './HeadBlend';
import FaceFeatures from './FaceFeatures';
import HeadOverlays from './HeadOverlays';
import Components from './Components';
import Props from './Props';
import Options from './Options';
import Modal from '../Modal';
import Tattoos from './Tattoos';
import { MriSidebar, MriButton } from '@mriqbox/ui-kit';
import styled from 'styled-components';

import { Wrapper, Container, ConfirmButton, HeaderContainer, TitleData, SwitchContainer, SwitchButton, TabbedContainer, ContentPanel, NavItem, SidebarNav } from './styles';

const StyledSidebar = styled(MriSidebar)`
  width: 280px;
  flex-shrink: 0;
  height: 100%;
  border-right: 1px solid rgba(255, 255, 255, 0.05);

  /* Target direct button children of the scrollable list (Sidebar Items) */
  & > div:first-child > button {
    height: 40px !important;
    min-height: 40px !important;
    max-height: 40px !important;
    flex-grow: 0 !important;
    padding: 0 12px !important;
    font-size: 13px !important;
    margin-bottom: 4px !important;
    width: 100%;
  }
  
  /* Icon adjustments for sidebar items */
  & > div:first-child > button svg {
    width: 16px;
    height: 16px;
  }

  /* Footer area styles */
  & > div:last-child {
     padding-top: 10px;
     border-top: 1px solid rgba(255,255,255,0.05);
  }

  /* Footer Confirm Button */
  & > div:last-child button {
     min-height: 44px;
     font-size: 14px !important;
     font-weight: 600;
  }
`;

const FooterContainer = styled.div`
  padding: 16px;
  margin-top: auto;
`;

const StyledConfirmButton = styled(MriButton)`
  width: 100%;
  display: flex !important;
  justify-content: center;
  align-items: center;
`;


import { ThemeContext } from 'styled-components';
import { FaCheck, FaThLarge, FaList, FaMale, FaUsers, FaSmile, FaPalette, FaTshirt, FaHatCowboy, FaSkull, FaAngleLeft, FaAngleRight, FaCog } from 'react-icons/fa';
import { ThemeToggleContext } from '../../App';
import React, { useContext } from 'react';

if (!import.meta.env.PROD || import.meta.env.VITE_SHOW_APPEARANCE == 'true') {
  mock('appearance_get_settings', () => ({
    appearanceSettings: {
      ...SETTINGS_INITIAL_STATE,
      eyeColor: { min: 0, max: 24 },
      hair: {
        ...SETTINGS_INITIAL_STATE.hair,
        color: {
          items: [
            [255, 0, 0],
            [0, 255, 0],
            [0, 0, 255],
            [0, 0, 255],
          ],
        },
      },
    },
  }));

  mock('appearance_get_data', () => ({
    appearanceData: { ...APPEARANCE_INITIAL_STATE, model: 'mp_f_freemode_01' },
  }));

  mock('appearance_change_model', () => SETTINGS_INITIAL_STATE);

  mock('appearance_change_component', () => SETTINGS_INITIAL_STATE.components);

  mock('appearance_change_prop', () => SETTINGS_INITIAL_STATE.props);
}

const Appearance = () => {
  const [config, setConfig] = useState<CustomizationConfig>();

  const [data, setData] = useState<PedAppearance>();
  const [storedData, setStoredData] = useState<PedAppearance>();
  const [appearanceSettings, setAppearanceSettings] = useState<AppearanceSettings>();

  const [camera, setCamera] = useState(CAMERA_INITIAL_STATE);
  const [rotate, setRotate] = useState(ROTATE_INITIAL_STATE);
  const [clothes, setClothes] = useState(CLOTHES_INITIAL_STATE);

  const [saveModal, setSaveModal] = useState(false);
  const [exitModal, setExitModal] = useState(false);

  const { display, setDisplay, locales, setLocales } = useNuiState();
  const { theme, setTheme, layout, setLayout } = useContext(ThemeToggleContext);
  const [activeTab, setActiveTab] = useState('ped');
  const [collapsed, setCollapsed] = useState(false);

  const wrapperTransition = useTransitionAnimation(display.appearance, null, {
    from: {
      transform: `translateX(${import.meta.env.VITE_SHOW_APPEARANCE == 'true' ? '0px' : '-50px'})`,
      opacity: import.meta.env.VITE_SHOW_APPEARANCE == 'true' ? 1 : 0
    },
    enter: {
      transform: 'translateY(0)',
      opacity: 1
    },
    leave: {
      transform: 'translateX(-50px)',
      opacity: 0
    },
  });

  const saveModalTransition = useTransitionAnimation(saveModal, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const exitModalTransition = useTransitionAnimation(exitModal, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  const handleTurnAround = useCallback(() => {
    Nui.post('appearance_turn_around');
  }, []);

  const handleSetClothes = useCallback(
    (key: keyof ClothesState) => {
      setClothes({ ...clothes, [key]: !clothes[key] });
      if (!clothes[key]) {
        Nui.post('appearance_remove_clothes', key);
      } else {
        Nui.post('appearance_wear_clothes', { data, key });
      }
    },
    [data, clothes, setClothes],
  );

  const handleSetCamera = useCallback(
    (key: keyof CameraState) => {
      setCamera({ ...CAMERA_INITIAL_STATE, [key]: !camera[key] });
      setRotate(ROTATE_INITIAL_STATE);

      if (!camera[key]) {
        Nui.post('appearance_set_camera', key);
      } else {
        Nui.post('appearance_set_camera', 'default');
      }
    },
    [camera, setCamera, setRotate],
  );

  const handleRotateLeft = useCallback(() => {
    setRotate({ left: !rotate.left, right: false });

    if (!rotate.left) {
      Nui.post('appearance_rotate_camera', 'left');
    } else {
      Nui.post('appearance_set_camera', 'current');
    }
  }, [setRotate, rotate]);

  const handleRotateRight = useCallback(() => {
    setRotate({ left: false, right: !rotate.right });

    if (!rotate.right) {
      Nui.post('appearance_rotate_camera', 'right');
    } else {
      Nui.post('appearance_set_camera', 'current');
    }
  }, [setRotate, rotate]);

  const handleSaveModal = useCallback(() => {
    setSaveModal(true);
  }, [setSaveModal]);

  const handleExitModal = useCallback(() => {
    setExitModal(true);
  }, [setExitModal]);

  const handleSave = useCallback(
    async (accept: boolean) => {
      if (accept) {
        await Nui.post('appearance_save', data);
        setSaveModal(false);
      } else {
        setSaveModal(false);
      }
    },
    [setSaveModal, data],
  );

  const handleExit = useCallback(
    async (accept: boolean) => {
      if (accept) {
        await Nui.post('appearance_exit');
        setExitModal(false);
      } else {
        setExitModal(false);
      }
    },
    [setExitModal],
  );

  const handleModelChange = useCallback(
    async (value: string) => {
      const { appearanceSettings: _appearanceSettings, appearanceData } = await Nui.post(
        'appearance_change_model',
        value,
      );

      setAppearanceSettings(_appearanceSettings);
      setData(appearanceData);
    },
    [setData, setAppearanceSettings],
  );

  const handleHeadBlendChange = useCallback(
    (key: keyof PedHeadBlend, value: number) => {
      if (!data) return;

      const updatedHeadBlend = { ...data.headBlend, [key]: value };

      const updatedData = { ...data, headBlend: updatedHeadBlend };

      setData(updatedData);

      Nui.post('appearance_change_head_blend', updatedHeadBlend);
    },
    [data, setData],
  );

  const handleFaceFeatureChange = useCallback(
    (key: keyof PedFaceFeatures, value: number) => {
      if (!data) return;

      const updatedFaceFeatures = { ...data.faceFeatures, [key]: value };

      const updatedData = { ...data, faceFeatures: updatedFaceFeatures };

      setData(updatedData);

      Nui.post('appearance_change_face_feature', updatedFaceFeatures);
    },
    [data, setData],
  );

  const handleHairChange = useCallback(
    async (key: keyof PedHair, value: number) => {
      if (!data || !appearanceSettings) return;

      const updatedHair = { ...data.hair, [key]: value };

      const updatedData = { ...data, hair: updatedHair };

      setData(updatedData);

      const updatedHairSettings = await Nui.post('appearance_change_hair', updatedHair);

      const updatedSettings = { ...appearanceSettings, hair: updatedHairSettings };

      setAppearanceSettings(updatedSettings);
    },
    [data, setData, appearanceSettings, setAppearanceSettings],
  );

  const handleChangeFade = useCallback(async (value: number) => {
    if (!data || !appearanceSettings) return;
    const { tattoos } = data;
    const updatedTattoos = { ...tattoos };
    const tattoo = appearanceSettings.tattoos.items['ZONE_HAIR'][value]
    if (!updatedTattoos[tattoo.zone]) updatedTattoos[tattoo.zone] = [];
    updatedTattoos[tattoo.zone] = [tattoo];
    await Nui.post('appearance_apply_tattoo', updatedTattoos);
    setData({ ...data, tattoos: updatedTattoos });
  }, [appearanceSettings, data, setData])

  const handleHeadOverlayChange = useCallback(
    (key: keyof PedHeadOverlays, option: keyof PedHeadOverlayValue, value: number) => {
      if (!data) return;

      const updatedValue = { ...data.headOverlays[key], [option]: value };

      const updatedData = { ...data, headOverlays: { ...data.headOverlays, [key]: updatedValue } };

      setData(updatedData);

      Nui.post('appearance_change_head_overlay', { ...data.headOverlays, [key]: updatedValue });
    },
    [data, setData],
  );

  const handleEyeColorChange = useCallback(
    (value: number) => {
      if (!data) return;

      const updatedData = { ...data, eyeColor: value };

      setData(updatedData);

      Nui.post('appearance_change_eye_color', value);
    },
    [data, setData],
  );

  const handleComponentDrawableChange = useCallback(
    async (component_id: number, drawable: number) => {
      if (!data || !appearanceSettings) return;

      const component = data.components.find(c => c.component_id === component_id);

      if (!component) return;

      const updatedComponent = { ...component, drawable, texture: 0 };

      const filteredComponents = data.components.filter(c => c.component_id !== component_id);

      const updatedComponents = [...filteredComponents, updatedComponent];

      const updatedData = { ...data, components: updatedComponents };

      setData(updatedData);

      const updatedComponentSettings = await Nui.post('appearance_change_component', updatedComponent);

      const filteredComponentsSettings = appearanceSettings.components.filter(c => c.component_id !== component_id);

      const updatedComponentsSettings = [...filteredComponentsSettings, updatedComponentSettings];

      const updatedSettings = { ...appearanceSettings, components: updatedComponentsSettings };

      setAppearanceSettings(updatedSettings);
    },
    [data, setData, appearanceSettings, setAppearanceSettings],
  );

  const handleComponentTextureChange = useCallback(
    async (component_id: number, texture: number) => {
      if (!data || !appearanceSettings) return;

      const component = data.components.find(c => c.component_id === component_id);

      if (!component) return;

      const updatedComponent = { ...component, texture };

      const filteredComponents = data.components.filter(c => c.component_id !== component_id);

      const updatedComponents = [...filteredComponents, updatedComponent];

      const updatedData = { ...data, components: updatedComponents };

      setData(updatedData);

      const updatedComponentSettings = await Nui.post('appearance_change_component', updatedComponent);

      const filteredComponentsSettings = appearanceSettings.components.filter(c => c.component_id !== component_id);

      const updatedComponentsSettings = [...filteredComponentsSettings, updatedComponentSettings];

      const updatedSettings = { ...appearanceSettings, components: updatedComponentsSettings };

      setAppearanceSettings(updatedSettings);
    },
    [data, setData, appearanceSettings, setAppearanceSettings],
  );

  const handlePropDrawableChange = useCallback(
    async (prop_id: number, drawable: number) => {
      if (!data || !appearanceSettings) return;

      const prop = data.props.find(p => p.prop_id === prop_id);

      if (!prop) return;

      const updatedProp = { ...prop, drawable, texture: 0 };

      const filteredProps = data.props.filter(p => p.prop_id !== prop_id);

      const updatedProps = [...filteredProps, updatedProp];

      const updatedData = { ...data, props: updatedProps };

      setData(updatedData);

      const updatedPropSettings = await Nui.post('appearance_change_prop', updatedProp);

      const filteredPropsSettings = appearanceSettings.props.filter(c => c.prop_id !== prop_id);

      const updatedPropsSettings = [...filteredPropsSettings, updatedPropSettings];

      const updatedSettings = { ...appearanceSettings, props: updatedPropsSettings };

      setAppearanceSettings(updatedSettings);
    },
    [data, setData, appearanceSettings, setAppearanceSettings],
  );

  const handlePropTextureChange = useCallback(
    async (prop_id: number, texture: number) => {
      if (!data || !appearanceSettings) return;

      const prop = data.props.find(p => p.prop_id === prop_id);

      if (!prop) return;

      const updatedProp = { ...prop, texture };

      const filteredProps = data.props.filter(p => p.prop_id !== prop_id);

      const updatedProps = [...filteredProps, updatedProp];

      const updatedData = { ...data, props: updatedProps };

      setData(updatedData);

      const updatedPropSettings = await Nui.post('appearance_change_prop', updatedProp);

      const filteredPropsSettings = appearanceSettings.props.filter(c => c.prop_id !== prop_id);

      const updatedPropsSettings = [...filteredPropsSettings, updatedPropSettings];

      const updatedSettings = { ...appearanceSettings, props: updatedPropsSettings };

      setAppearanceSettings(updatedSettings);
    },
    [data, setData, appearanceSettings, setAppearanceSettings],
  );

  const isPedFreemodeModel = useMemo(() => {
    if (!data) return;

    return data.model === 'mp_m_freemode_01' || data.model === 'mp_f_freemode_01';
  }, [data]);

  const isPedMale = useMemo(() => {
    if (!data) return;

    if (data.model === 'mp_m_freemode_01') {
      return true;
    }

    return false
  }, [data]);

  const filterTattoos = (tattooSettings: TattoosSettings) => {
    for (const zone in tattooSettings.items) {
      tattooSettings.items[zone] = tattooSettings.items[zone].filter(tattoo => {
        if (isPedMale && tattoo.hashMale !== "") {
          return tattoo;
        } else if (!isPedMale && tattoo.hashFemale !== "") {
          return tattoo;
        }
      })
    }
    return tattooSettings;
  };

  const handleApplyTattoo = useCallback(
    async (tattoo: Tattoo, opacity: number) => {
      if (!data) return;
      tattoo.opacity = opacity;
      const { tattoos } = data;
      const updatedTattoos = JSON.parse(JSON.stringify({ ...tattoos }));
      if (!updatedTattoos[tattoo.zone]) updatedTattoos[tattoo.zone] = [];
      updatedTattoos[tattoo.zone].push(tattoo);
      const applied = await Nui.post('appearance_apply_tattoo', { tattoo, updatedTattoos });
      if (applied) {
        setData({ ...data, tattoos: updatedTattoos });
      }
    },
    [data, setData],
  );

  const handlePreviewTattoo = useCallback(
    (tattoo: Tattoo, opacity: number) => {
      if (!data) return;
      tattoo.opacity = opacity;
      const { tattoos } = data;
      Nui.post('appearance_preview_tattoo', { data: tattoos, tattoo });
    },
    [data],
  );

  const handleDeleteTattoo = useCallback(
    async (tattoo: Tattoo) => {
      if (!data) return;
      const { tattoos } = data;
      const updatedTattoos = tattoos;
      // eslint-disable-next-line prettier/prettier
      updatedTattoos[tattoo.zone] = updatedTattoos[tattoo.zone].filter(tattooDelete => tattooDelete.name !== tattoo.name);
      await Nui.post('appearance_delete_tattoo', updatedTattoos);
      setData({ ...data, tattoos: updatedTattoos });
    },
    [data, setData],
  );

  const handleClearTattoos = useCallback(
    async () => {
      if (!data) return;
      const { tattoos } = data;
      const updatedTattoos = { ...tattoos };
      for (var zone in updatedTattoos) {
        if (zone !== "ZONE_HAIR") {
          updatedTattoos[zone] = [];
        }
      }
      await Nui.post('appearance_delete_tattoo', updatedTattoos);
      setData({ ...data, tattoos: updatedTattoos });
    },
    [data, setData],
  );

  useEffect(() => {
    if (!locales) {
      Nui.post('appearance_get_locales').then(result => setLocales(result || mockLocales));
    }

    Nui.onEvent('appearance_display', (data: any) => {
      setDisplay({ appearance: true, asynchronous: data.asynchronous });
    });

    Nui.onEvent('appearance_hide', () => {
      setDisplay({ appearance: false, asynchronous: false });
      setData(APPEARANCE_INITIAL_STATE);
      setStoredData(APPEARANCE_INITIAL_STATE);
      //setAppearanceSettings(SETTINGS_INITIAL_STATE);
      setCamera(CAMERA_INITIAL_STATE);
      setRotate(ROTATE_INITIAL_STATE);
    });
  }, []);

  const fetchData = useCallback(async () => {
    const result = await Nui.post('appearance_get_data');
    setConfig(result.config || mockConfig);
    setStoredData(result.appearanceData);
    setData(result.appearanceData);
  }, []);

  const fetchSettings = useCallback(async () => {
    if (appearanceSettings === undefined || appearanceSettings === SETTINGS_INITIAL_STATE) {
      const result = await Nui.post('appearance_get_settings');
      setAppearanceSettings(result.appearanceSettings);
    }
  }, []);

  useEffect(() => {
    if (display.appearance) {
      if (display.asynchronous) {
        (async () => {
          await fetchSettings();
          await fetchData();
        })();
      } else {
        fetchSettings().catch(console.error);
        fetchData().catch(console.error);
      }
    }
  }, [display.appearance]);

  // Build sections list based on availability
  const sections = useMemo(() => {
    if (!config || !appearanceSettings || typeof isPedFreemodeModel === 'undefined') return [];

    // Helper to filter tattoos if needed, but we do it in render

    const list = [
      {
        id: 'ped',
        title: 'Ped',
        icon: FaMale,
        visible: !!config.ped
      },
      {
        id: 'headBlend',
        title: 'Herança',
        icon: FaUsers,
        visible: isPedFreemodeModel && !!config.headBlend
      },
      {
        id: 'faceFeatures',
        title: 'Características faciais',
        icon: FaSmile,
        visible: isPedFreemodeModel && !!config.faceFeatures
      },
      {
        id: 'headOverlays',
        title: 'Aparência',
        icon: FaPalette,
        visible: !!config.headOverlays
      },
      {
        id: 'components',
        title: 'Roupas',
        icon: FaTshirt,
        visible: !!config.components
      },
      {
        id: 'props',
        title: 'Acessórios',
        icon: FaHatCowboy,
        visible: !!config.props
      },
      {
        id: 'tattoos',
        title: 'Tatuagens',
        icon: FaSkull,
        visible: isPedFreemodeModel && !!config.tattoos
      },
    ];

    return list.filter(item => item.visible);
  }, [config, appearanceSettings, isPedFreemodeModel]);

  // Ensure active tab is valid
  useEffect(() => {
    if (sections.length > 0 && !sections.find(s => s.id === activeTab)) {
      setActiveTab(sections[0].id);
    }
  }, [sections, activeTab]);

  if (!display.appearance || !config || !appearanceSettings || !data || !storedData || !locales) {
    return null;
  }



  const renderSectionContent = (id: string) => {
    switch (id) {
      case 'ped':
        return config.ped && (
          <Ped
            settings={appearanceSettings.ped}
            storedData={storedData.model}
            data={data.model}
            handleModelChange={handleModelChange}
            forcedOpen={layout === 'tabs'}
          />
        );
      case 'headBlend':
        return isPedFreemodeModel && config.headBlend && (
          <HeadBlend
            settings={appearanceSettings.headBlend}
            storedData={storedData.headBlend}
            data={data.headBlend}
            handleHeadBlendChange={handleHeadBlendChange}
            forcedOpen={layout === 'tabs'}
          />
        );
      case 'faceFeatures':
        return isPedFreemodeModel && config.faceFeatures && (
          <FaceFeatures
            settings={appearanceSettings.faceFeatures}
            storedData={storedData.faceFeatures}
            data={data.faceFeatures}
            handleFaceFeatureChange={handleFaceFeatureChange}
            forcedOpen={layout === 'tabs'}
          />
        );
      case 'headOverlays':
        return config.headOverlays && (
          <HeadOverlays
            settings={{
              hair: appearanceSettings.hair,
              headOverlays: appearanceSettings.headOverlays,
              eyeColor: appearanceSettings.eyeColor,
              fade: appearanceSettings.tattoos.items['ZONE_HAIR']
            }}
            storedData={{
              hair: storedData.hair,
              headOverlays: storedData.headOverlays,
              eyeColor: storedData.eyeColor,
              fade: storedData.tattoos?.ZONE_HAIR?.length > 0 ? storedData.tattoos.ZONE_HAIR[0] : null
            }}
            data={{
              hair: data.hair,
              headOverlays: data.headOverlays,
              eyeColor: data.eyeColor,
              fade: data.tattoos?.ZONE_HAIR?.length > 0 ? data.tattoos.ZONE_HAIR[0] : null
            }}
            isPedFreemodeModel={isPedFreemodeModel}
            handleHairChange={handleHairChange}
            handleHeadOverlayChange={handleHeadOverlayChange}
            handleEyeColorChange={handleEyeColorChange}
            handleChangeFade={handleChangeFade}
            automaticFade={config.automaticFade}
            forcedOpen={layout === 'tabs'}
          />
        );
      case 'components':
        return config.components && (
          <Components
            settings={appearanceSettings.components}
            data={data.components}
            storedData={storedData.components}
            handleComponentDrawableChange={handleComponentDrawableChange}
            handleComponentTextureChange={handleComponentTextureChange}
            componentConfig={config.componentConfig}
            hasTracker={config.hasTracker}
            isPedFreemodeModel={isPedFreemodeModel}
            forcedOpen={layout === 'tabs'}
          />
        );
      case 'props':
        return config.props && (
          <Props
            settings={appearanceSettings.props}
            data={data.props}
            storedData={storedData.props}
            handlePropDrawableChange={handlePropDrawableChange}
            handlePropTextureChange={handlePropTextureChange}
            propConfig={config.propConfig}
            forcedOpen={layout === 'tabs'}
          />
        );
      case 'tattoos':
        return isPedFreemodeModel && config.tattoos && (
          <Tattoos
            settings={filterTattoos(appearanceSettings.tattoos)}
            data={data.tattoos}
            storedData={storedData.tattoos}
            handleApplyTattoo={handleApplyTattoo}
            handlePreviewTattoo={handlePreviewTattoo}
            handleDeleteTattoo={handleDeleteTattoo}
            handleClearTattoos={handleClearTattoos}
            forcedOpen={layout === 'tabs'}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {wrapperTransition.map(
        ({ item, key, props: style }) =>
          item && (
            <animated.div key={key} style={style}>
              <Wrapper>
                <TabbedContainer style={{ width: '75vw', minWidth: '700px' }}>
                  <SidebarNav style={{ width: collapsed ? '64px' : '280px', transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)' }}>
                    {!collapsed && (
                      <HeaderContainer style={{ flexShrink: 0, marginBottom: '20px' }}>
                        <TitleData>
                          <h1>mri_Qappearance</h1>
                          <p>Customização</p>
                        </TitleData>
                        <SwitchContainer title="Expandir/Recolher Menu">
                          <SwitchButton active={!collapsed} onClick={() => setCollapsed(false)}>
                            <FaThLarge size={14} />
                          </SwitchButton>
                          <SwitchButton active={collapsed} onClick={() => setCollapsed(true)}>
                            <FaList size={14} />
                          </SwitchButton>
                        </SwitchContainer>
                      </HeaderContainer>
                    )}

                    {collapsed && (
                      <div style={{ paddingBottom: '20px', marginBottom: '10px', display: 'flex', justifyContent: 'center' }}>
                        <SwitchButton active onClick={() => setCollapsed(false)}>
                          <FaThLarge size={14} />
                        </SwitchButton>
                      </div>
                    )}

                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', overflowY: 'auto', overflowX: 'hidden' }}>
                      {sections.map(s => (
                        <NavItem
                          key={s.id}
                          active={activeTab === s.id}
                          onClick={() => setActiveTab(s.id)}
                          title={collapsed ? s.title : ''}
                        >
                          <s.icon />
                          {!collapsed && <span>{s.title}</span>}
                        </NavItem>
                      ))}
                    </div>

                    <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                      <NavItem onClick={() => console.log('Settings clicked')} style={{ background: 'rgba(255,255,255,0.03)', justifyContent: collapsed ? 'center' : 'flex-start' }}>
                        <FaCog />
                        {!collapsed && <span>Configuração</span>}
                      </NavItem>

                      {!collapsed && (
                        <ConfirmButton onClick={handleSaveModal} style={{ marginBottom: 0 }}>
                          <FaCheck /> Confirmar
                        </ConfirmButton>
                      )}
                      {collapsed && (
                        <NavItem onClick={handleSaveModal} active title="Confirmar" style={{ background: `rgb(${theme === 'dark' ? '10, 213, 140' : '139, 92, 246'})`, justifyContent: 'center' }}>
                          <FaCheck />
                        </NavItem>
                      )}
                    </div>
                  </SidebarNav>
                  <ContentPanel>
                    {renderSectionContent(activeTab)}
                  </ContentPanel>

                  <Options
                    camera={camera}
                    rotate={rotate}
                    clothes={clothes}
                    handleSetClothes={handleSetClothes}
                    handleSetCamera={handleSetCamera}
                    handleTurnAround={handleTurnAround}
                    handleRotateLeft={handleRotateLeft}
                    handleRotateRight={handleRotateRight}
                    handleSave={handleSaveModal}
                    handleExit={handleExitModal}
                    enableExit={config.enableExit}
                    layout={layout}
                    collapsed={collapsed}
                  />
                </TabbedContainer>
              </Wrapper>
            </animated.div>
          ),
      )}
      {saveModalTransition.map(
        ({ item, key, props: style }) =>
          item && (
            <animated.div key={key} style={style}>
              <Modal
                title={locales.modal.save.title}
                description={locales.modal.save.description}
                accept={locales.modal.accept}
                decline={locales.modal.decline}
                handleAccept={() => handleSave(true)}
                handleDecline={() => handleSave(false)}
              />
            </animated.div>
          ),
      )}
      {exitModalTransition.map(
        ({ item, key, props: style }) =>
          item && (
            <animated.div key={key} style={style}>
              <Modal
                title={locales.modal.exit.title}
                description={locales.modal.exit.description}
                accept={locales.modal.accept}
                decline={locales.modal.decline}
                handleAccept={() => handleExit(true)}
                handleDecline={() => handleExit(false)}
              />
            </animated.div>
          ),
      )}
    </>
  );
};

export default Appearance;
