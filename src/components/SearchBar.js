import React from 'react';

import SortButtonGroup from './SortButtonGroup';

import {useDispatch, useSelector} from 'react-redux';
import {toggleSearch, resetSearch} from '../features/SearchSlice';

import {Header, Item, Icon, Input} from 'native-base';
import {TouchableOpacity} from 'react-native';

export default function SearchBar({Inventory}) {
  const dispatch = useDispatch();

  const search = useSelector((state) => state.Search.text);

  return (
    <Header searchBar rounded>
      <Item>
        <Icon type="FontAwesome" name="search" />
        <Input
          placeholder="Search"
          value={search}
          onChangeText={(e) => {
            dispatch(toggleSearch({value: e}));
          }}
          autoCapitalize="characters"
        />
        {search.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              dispatch(resetSearch());
            }}>
            <Icon type="AntDesign" name="close" />
          </TouchableOpacity>
        )}
        <SortButtonGroup Inventory={Inventory} />
      </Item>
    </Header>
  );
}
