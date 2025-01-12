"use client";
import React, { Component} from 'react';
import { FacebookProvider, CustomChat } from 'react-facebook';

const FacebookMSG = () => {
    return (
      <FacebookProvider appId="1293995261841871" chatSupport>
        <CustomChat pageId="399543723245708" minimized={true}/>
      </FacebookProvider>    
    );
};
export default FacebookMSG;
