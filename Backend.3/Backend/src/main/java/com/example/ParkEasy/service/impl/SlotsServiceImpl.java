package com.example.ParkEasy.service.impl;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import com.example.ParkEasy.exception.ResourceNotFoundException;
import com.example.ParkEasy.model.Slots;
import com.example.ParkEasy.repository.SlotsRepository;
import com.example.ParkEasy.service.SlotsService;

@Service
public class SlotsServiceImpl implements SlotsService {
	private SlotsRepository slotsRepository;

	public SlotsServiceImpl(SlotsRepository slotsRepository) {
		super();
		this.slotsRepository = slotsRepository;
	}

	@Override
	public Slots saveSlots(Slots slot) {
		return slotsRepository.save(slot);
	}

	@Override
	public Optional<Slots> getSlot(long id) {
		return slotsRepository.findById(id);
	}

	@Override
	public List<Slots> getAllSlots() {
		return slotsRepository.findAll();

	}

	@Override
	public Slots updateSlots(Slots slot, long id, String chosenFeatures) {
		Slots existingSlot = slotsRepository.findById(id).orElseThrow(
				() -> new ResourceNotFoundException("Slots", "Id", id));
		existingSlot.setStatus(slot.getStatus());
		existingSlot.setTime(slot.getTime());
		existingSlot.setChosenFeatures(slot.getChosenFeatures());
		slotsRepository.save(existingSlot);

		return existingSlot;
	}
}