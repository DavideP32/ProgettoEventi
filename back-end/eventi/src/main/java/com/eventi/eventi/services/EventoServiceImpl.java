/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */

package com.eventi.eventi.services;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import com.eventi.eventi.configuration.UploadImg;
import com.eventi.eventi.entities.Evento;
import com.eventi.eventi.repositories.EventoRepository;

@Service
public class EventoServiceImpl implements EventoService{

    @Autowired
    EventoRepository eventoRepository;

    /* -------------------------------------------------------------------------- */
    /*                                     ALL                                    */
    /* -------------------------------------------------------------------------- */
    @Override
    public List<Evento> getAllEventi(){
        List<Evento> eventi = eventoRepository.findAll();
        
        return eventi;
    }

    /* -------------------------------------------------------------------------- */
    /*                                  GET BY ID                                 */
    /* -------------------------------------------------------------------------- */

    @Override
    public Evento getEventoById(long id){
        Optional<Evento> optional = eventoRepository.findById(id);
        
        if(optional.isPresent()){
            Evento evento = optional.get();
            return evento;
        }else{
            return null;
        }
    }

    /* -------------------------------------------------------------------------- */
    /*                                 GET BY NOME                                */
    /* -------------------------------------------------------------------------- */
    @Override
    public List<Evento> getEventiByNome(String nome){
        List<Evento> eventi = eventoRepository.findByNomeContainingIgnoreCase(nome);

        return eventi;
        
    }


    /* -------------------------------------------------------------------------- */
    /*                                 POST EVENTO                                */
    /* -------------------------------------------------------------------------- */

    @Override
    public Evento aggiungiEvento(Evento evento){
        evento.setId(0L);
        eventoRepository.save(evento);
        return evento;
    }


    /* -------------------------------------------------------------------------- */
    /*                                 PUT EVENTO                                 */
    /* -------------------------------------------------------------------------- */
    @Override
    public Evento aggiornaEvento(Evento evento, Evento trovato){
        trovato.setNome(evento.getNome());
        trovato.setTipologia(evento.getTipologia());
        trovato.setCaratteristiche(evento.getCaratteristiche());
        trovato.setDescrizione(evento.getDescrizione());
        trovato.setLuogoEvento(evento.getLuogoEvento());
        trovato.setCoordinateGPS(evento.getCoordinateGPS());
        trovato.setPosti(evento.getPosti());
        trovato.setDisponibilita(evento.isDisponibilita());
        trovato.setDataEvento(evento.getDataEvento());
        trovato.setPrezzo(evento.getPrezzo());
        trovato.setEmail(evento.getEmail());

        eventoRepository.save(trovato);

        return evento;
    }

    @Override
    public Evento aggiornaPostiEvento (Evento trovato, int posti){
        trovato.setPosti(trovato.getPosti() - posti);
        
        eventoRepository.save(trovato);
        return trovato;
    }

    /* -------------------------------------------------------------------------- */
    /*                               CANCELLA EVENTO                              */
    /* -------------------------------------------------------------------------- */
    @Override
    public void cancellaEvento(long id){
        eventoRepository.deleteById(id);

    }


    /* -------------------------------------------------------------------------- */
    /*                              EVENTO + IMMAGINE                             */
    /* -------------------------------------------------------------------------- */
    @Override
    public Evento saveEvento(Evento evento, MultipartFile multipartFile) {
        evento.setId(0L);
		// controllo se è stata caricata un'immagine
		if(multipartFile == null || multipartFile.isEmpty()) {
			// non è stata caricata una immagine, salvo comunque il veicolo
			eventoRepository.save(evento);
			
			// ritorno al controller
			return evento;		
		}
		 
		// c'è 1 immagine da salvare oltre ai dati del veicolo
		// nome del file o immagine: **rimuovo spazi**
		String fileName = StringUtils.cleanPath(multipartFile.getOriginalFilename().strip().replace(" ", "-"));
		
        // fileName = "img" + fileName;
		// setto nome del file prima di salvare il veicolo
		evento.setPercorso(fileName);		
		// salvo il veicolo
		eventoRepository.save(evento);

		// genero il percorso della cartella dove salvare l'immagine
		// String uploadDir = UploadImg.IMG_SAVE_PATH + "/" + evento.getId();
        String uploadDir = UploadImg.IMG_SAVE_PATH;
		 
        try {
			// converte percorso stringa in un path
			Path uploadPath = Paths.get(uploadDir);

			if (!Files.exists(uploadPath)) {
				// crea cartella dove salvare l'immagine se non esiste
				Files.createDirectories(uploadPath); // throws IOException
			}
			try (InputStream inputStream = multipartFile.getInputStream()) { // try with resource
				Path filePath = uploadPath.resolve(fileName); // percorso file completo
				// sovrascrive file se già presente con stesso nome
				Files.copy(inputStream, filePath, StandardCopyOption.REPLACE_EXISTING);


			} catch (IOException ioe) {
				throw new IOException("Could not save image file: " + fileName, ioe);
			}
			
		} catch (IOException e) {
			e.printStackTrace();
		}
        

        // restituisco il veicolo salvato
		return evento;
		
	}
}
