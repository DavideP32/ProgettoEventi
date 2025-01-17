/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.eventi.eventi.configuration;

import org.springframework.context.annotation.Configuration;

@Configuration
public class UploadImg {

	// cartella dove salvare le immagini

	public static final String IMG_SAVE_PATH = "src/main/resources/static/img";
	public static final String IMG_URL_PATH = "img";
	
	// immagine di default del veicolo se non è stata caricata
	public static final String DEFAULT_IMG_PATH = "img/feste_sagre1.webp";

	
	
}
