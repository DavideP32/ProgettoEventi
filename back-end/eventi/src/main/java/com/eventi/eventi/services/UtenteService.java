
package com.eventi.eventi.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.eventi.eventi.dtos.UtenteDto;

@Service
public interface UtenteService {

    public List<UtenteDto> getAllDto();
}
